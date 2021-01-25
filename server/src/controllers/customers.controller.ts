import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Customers, Activations, User, Partners} from '../models';
import {CustomersRepository, ActivationsRepository, UserRepository} from '../repositories';
import { CONSTANTS } from '../constants';
import {JWT_SECRET, secured, SecuredType} from '../auth';
const uuid = require("uuid");
import {promisify} from 'util';
const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);
import {SendPk} from '../sms/sendpk'
import { constants } from 'os';
import { winstonLogger as logger } from "../logger";


export class CustomersController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,

    @repository(ActivationsRepository)
    public activationsRepository : ActivationsRepository,

    @repository(UserRepository)
    public userRepository : UserRepository,

    

  //  public response : Response

  ) {}


  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/customers', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomers',
            exclude: ['id'],
          }),
        },
      },
    })
    customers: Omit<Customers, 'id'>,
  ): Promise<Customers> {
    customers.createdDate = new Date();
    return this.customersRepository.create(customers);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/customers/count', {
    responses: {
      '200': {
        description: 'Customers model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Customers)) where?: Where<Customers>,
  ): Promise<Count> {
    return this.customersRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/customers', {
    responses: {
      '200': {
        description: 'Array of Customers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Customers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Customers)) filter?: Filter<Customers>,
  ): Promise<Customers[]> {

    if(filter){
      filter.order = ['createdDate Desc']
    }else{
      filter = {};
      filter.order = ['createdDate Desc']
    }

    filter.limit = 20;
    //filter.skip = 0;

    filter.fields = {id: true, name: true, phone: true, isActivated: true, isWebRegistered: true, deviceToken: true};
    return this.customersRepository.find(filter);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/customers', {
    responses: {
      '200': {
        description: 'Customers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Customers,
    @param.query.object('where', getWhereSchemaFor(Customers)) where?: Where<Customers>,
  ): Promise<Count> {
    return this.customersRepository.updateAll(customers, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/customers/{id}', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Customers)) filter?: Filter<Customers>
  ): Promise<Customers> {
    // const session = (this.customersRepository.dataSource.connector as any).client.startSession();
    // session.startTransaction();
    // const customers = this.customersRepository.find(filter, {session});
    // const commit = await session.commitTransaction();
    // logger.debug('transaction commit', commit);
    // session.endSession();
    //  return customers;
    if(!filter){
      filter = {}
    }
    filter.fields = {id: true, name: true, phone: true, isActivated: true, isWebRegistered: true, deviceToken: true};
    return this.customersRepository.findById(id, filter);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Customers,
  ): Promise<void> {
    await this.customersRepository.updateById(id, customers);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customers: Customers,
  ): Promise<void> {
    await this.customersRepository.replaceById(id, customers);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customersRepository.deleteById(id);
  }


  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/customers/authenticate', {
    responses: {
      '200': {
        description: 'Please Activate via SMS CODE',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async authenticate(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomers',
            exclude: ['id'],
          }),
        },
      },
    })
    customers: Omit<Customers, 'id'>,
  ): Promise< User | Customers | any> {
    const sendPk = new SendPk();
   
    let appVersion = customers.versionCode;
    let phone = this.validatePhone(customers.phone);
    if(!phone){
      return CONSTANTS.INVALID_PHONE_NUMBER; 
    }
        
        let filter = {
            "where": { phone },
            // "fields": {
            //     "id": true,
            //     "name": true,
            //     "phone": true,
            // }
        };
        let foundCust = await this.customersRepository.find(filter);
        logger.debug(foundCust);
        if (foundCust && foundCust.length === 0) {
          customers.phone = phone;
          const tokenObject = {username: phone};
          let token = await signAsync(tokenObject, JWT_SECRET);
          customers.access_token = token;
            //customers.access_token = uuid.v4();
            customers.isActivated = false;
            //deviceToken is coming in the request.
            //customers.deviceToken = activations.deviceToken;
            customers.createdDate= new Date();
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let smsCode = Math.floor(Math.random() * 899999 + 100000);
            await this.activationsRepository.create({ phone, smsCode: smsCode, expiry: tomorrow.toString() });
            const createdCustomer = await this.customersRepository.create(customers);
            let user = await this.userRepository.create({username: phone});
            delete createdCustomer.access_token;
            
            sendPk.sendOTP(smsCode, createdCustomer.phone);
            return createdCustomer;
            
        }
        else {
          //if customer already exist then deviceToken update at other api /update/device/token
            if(foundCust[0].isActivated === true){
              if(!appVersion){
                let smsCode = Math.floor(Math.random() * 899999 + 100000);
                await this.activationsRepository.create({ phone, smsCode: smsCode });
                sendPk.sendOTP(smsCode, phone);

                delete foundCust[0].access_token;
              }

              return foundCust[0];
            }
            
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let smsCode = Math.floor(Math.random() * 899999 + 100000);
            await this.activationsRepository.deleteAll({ phone });
            await this.activationsRepository.create({ phone, smsCode: smsCode, expiry: tomorrow.toString() });
            foundCust[0].isActivated = false;            
            await this.customersRepository.updateAll(foundCust[0], { phone });
             
            sendPk.sendOTP(smsCode, foundCust[0].phone);
            delete foundCust[0].access_token;
            return foundCust[0];
            
        }
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/customers/activate', {
    responses: {
      '204': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async activation(
    @requestBody() activations: Activations,
   
  ): Promise<Customers | any> {

    let phone = activations.phone;
    phone = this.validatePhone(phone);
    if(!phone){
      return CONSTANTS.INVALID_PHONE_NUMBER; 
    }
    let deviceId = activations.deviceId;
    let deviceToken = activations.deviceToken;
    let smsCode = activations.smsCode;
    let actRecord = await this.activationsRepository.findOne({ "where": { and:[{phone}, {smsCode}] } });
    
    if (actRecord) {
      logger.debug(JSON.stringify(actRecord));
        let customer = { isActivated: true, deviceId: deviceId, deviceToken: deviceToken };
        await this.customersRepository.updateAll(customer, { phone });
        await this.activationsRepository.deleteAll({ phone });
        
        const customerInfo =  await this.customersRepository.findOne({ "where": { phone } });
        return customerInfo;       
    }
    else {      
        return CONSTANTS.ACTIVATION_FAILED;
    }
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/customers/{id}/activation/resend', {
    responses: {
      '200': {
        description: 'Customers model instance',
        //content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async activationResend(
    @param.path.string('id') id: string,
   
  ): Promise<any> {

    const sendPk = new SendPk();
    const customerInfo =  await this.customersRepository.findById(id);
    logger.debug('customerInfo record', JSON.stringify(customerInfo));
    let actRecord = await this.activationsRepository.findOne({ "where": { phone: customerInfo.phone } });
    logger.debug('Activation record', JSON.stringify(actRecord));
    if(actRecord){
      sendPk.sendOTP(actRecord.smsCode, actRecord.phone);
      return CONSTANTS.ACTIVATION_RESENT;
    }else {      
      return CONSTANTS.ACTIVATION_NOT_FOUND;
    }
    
  }

  @patch('/customers/{id}/device/{token}', {
    responses: {
      '200': {
        description: 'Customers model instance',
        //content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async updateDeviceToken(
    @param.path.string('id') id: string,
    @param.path.string('token') token: string,
   
  ): Promise<any> {

    if(!id || !token){
      return CONSTANTS.ACTIVATION_NOT_FOUND;
    }
    await this.customersRepository.updateById(id, {deviceToken: token});
       
  }






   validatePhone (phone: string): string {
    phone = parseInt(phone, 10).toString();
    
    if(phone.length < 10) {
      return ''; 
     }    
     if(phone.length === 10){
       phone = "92"+phone;
     }
     
     if(phone.length !== 12){
       return '';
     }
     if(phone.length === 12 && phone.substring(0, 2) != "92" ){
       return '';
     }

     return phone;
  }

  async sendSMS() : Promise<any>{
  
    // Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
// logger.debug('sending sms via twilio..');
// const accountSid = 'ACeccf074eced9ed0be6a11fba3295228d';
// const authToken = 'e6b969ab8a142a69f2ee6569c4240725';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to:   '+923136604801'
//    })
//   .then( (message: any) => { 
//     logger.debug(message.sid);
//     return message;
//   })
//   .catch( (error: any) => logger.debug(error))
//   }

  }

}

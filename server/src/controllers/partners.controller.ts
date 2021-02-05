import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  property,
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
import {Partners, Activations, User} from '../models';
import {PartnersRepository, ActivationsRepository, UserRepository} from '../repositories';
const uuid = require("uuid");
import { CONSTANTS } from '../constants';
import {JWT_SECRET, secured, SecuredType} from '../auth';
import {promisify} from 'util';
const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);
import { winstonLogger as logger } from "../logger";
import {SendPk} from '../sms/sendpk'


export class PartnersController {
  constructor(
    @repository(PartnersRepository)
    public partnersRepository : PartnersRepository,
    @repository(ActivationsRepository)
    public activationsRepository : ActivationsRepository,

    @repository(UserRepository)
    public userRepository : UserRepository,

  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/partners', {
    responses: {
      '200': {
        description: 'Partners model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partners)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partners, {
            title: 'NewPartners',
            exclude: ['id'],
          }),
        },
      },
    })
    partners: Omit<Partners, 'id'>,
  ): Promise<Partners> {
    return this.partnersRepository.create(partners);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/partners/count', {
    responses: {
      '200': {
        description: 'Partners model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Partners)) where?: Where<Partners>,
  ): Promise<Count> {
    return this.partnersRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/partners', {
    responses: {
      '200': {
        description: 'Array of Partners model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Partners, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Partners)) filter?: Filter<Partners>,
  ): Promise<Partners[]> {
    return this.partnersRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/partners', {
    responses: {
      '200': {
        description: 'Partners PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partners, {partial: true}),
        },
      },
    })
    partners: Partners,
    @param.query.object('where', getWhereSchemaFor(Partners)) where?: Where<Partners>,
  ): Promise<Count> {
    return this.partnersRepository.updateAll(partners, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/partners/{id}', {
    responses: {
      '200': {
        description: 'Partners model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partners, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Partners)) filter?: Filter<Partners>
  ): Promise<Partners> {
    return this.partnersRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/partners/{id}', {
    responses: {
      '204': {
        description: 'Partners PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partners, {partial: true}),
        },
      },
    })
    partners: Partners,
  ): Promise<void> {
    await this.partnersRepository.updateById(id, partners);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/partners/{id}', {
    responses: {
      '204': {
        description: 'Partners PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partners: Partners,
  ): Promise<void> {
    await this.partnersRepository.replaceById(id, partners);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/partners/{id}', {
    responses: {
      '204': {
        description: 'Partners DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partnersRepository.deleteById(id);
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/partners/authenticate', {
    responses: {
      '200': {
        description: 'Partners model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partners)}},
      },
    },
  })
  async authenticate(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partners, {
            title: 'NewPartners',
            exclude: ['id'],
          }),
        },
      },
    })
    partners: Omit<Partners, 'id'>,
  ): Promise<User | Partners | any> {
    
    const sendPk = new SendPk();
    let phone = this.validatePhone(partners.phone);
    if(!phone){
      return CONSTANTS.INVALID_PHONE_NUMBER; 
    }
    //let phone = partners.phone;
        // let filter = getFilterSchemaFor(Customers);
        let filter = {
            "where": { phone },
            // "fields": {
            //     "id": true,
            //     "name": true,
            //     "phone": true,
            // }
        };
        let foundCust = await this.partnersRepository.find(filter);
        logger.debug(foundCust);
        if (foundCust && foundCust.length === 0) {
          partners.phone = phone;
          const tokenObject = {username: phone};
          let token = await signAsync(tokenObject, JWT_SECRET);
            partners.access_token = token;
            partners.isActivated = false;
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let smsCode = Math.floor(Math.random() * 899999 + 100000);
            await this.activationsRepository.create({ phone, smsCode: smsCode, createdTime: new Date() });
            partners.createdTime = new Date();
            let created_partner = await this.partnersRepository.create(partners);
            let user = await this.userRepository.create({username: phone});
           
            logger.debug('sending authentication otp to partner');
            sendPk.sendOTP(smsCode, partners.phone);

           // delete created_partner.access_token;
            return created_partner;
            
        }
        else {
          //if partner already exist then deviceToken update at other api /update/device/token
          if(foundCust[0].isActivated === true){
            return foundCust[0];
          }
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let smsCode = Math.floor(Math.random() * 899999 + 100000);
            await this.activationsRepository.deleteAll({ phone });
            await this.activationsRepository.create({ phone, smsCode: smsCode, createdTime: new Date() });
            foundCust[0].isActivated = false;
           // foundCust[0].access_token = uuid.v4();
            await this.partnersRepository.updateAll(foundCust[0], { phone });

            sendPk.sendOTP(smsCode, foundCust[0].phone);
           // delete foundCust[0].access_token;
            
            return foundCust[0];
        }
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/partners/activate', {
    responses: {
      '200': {
        description: 'Partners model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partners)}},
      },
    },
  })
  async activation(
    @requestBody() activations: Activations,
  ): Promise<Partners | any> {
    let phone = activations.phone;
    phone = this.validatePhone(phone);
    if(!phone){
      return CONSTANTS.INVALID_PHONE_NUMBER; 
    }
    let smsCode = activations.smsCode;
    let actRecord = await this.activationsRepository.findOne({ "where": { phone, smsCode } });
    
    if (actRecord) {
      logger.debug(JSON.stringify(actRecord));
        let info = { isActivated: true };
        await this.partnersRepository.updateAll(info, { phone });
        await this.activationsRepository.deleteAll({ phone });
        return await this.partnersRepository.findOne({ "where": { phone } });
    }
    else {
      return CONSTANTS.ACTIVATION_FAILED;
    }
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/partners/{id}/location/{long}/{lat}', {
    responses: {
      '204': {
        description: 'Partners Location Updated Success',
        content: {'application/json': {schema: {type:"object", properties:{id: {type:"string"} }} }},
      },
    },
  })
  async updatePartnerLocation(
    @param.path.string('id') id: string,
    @param.path.string('long') long: string,
    @param.path.string('lat') lat: string,
  ): Promise<object> {
    let location;
    location = {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)]
    };
    await this.partnersRepository.updateById(id, { location: location });
    return {id};
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



}

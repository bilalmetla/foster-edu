import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  Order,
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
import {Products, Orders, Customers, Orderdetails} from '../models';
import {ProductsRepository, OrdersRepository, CustomersRepository, 
  ProducttypesRepository, OrderdetailsRepository, PartnersRepository, UserRepository} from '../repositories';
import fs from 'fs';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)
import path from 'path';
import { MethodDecoratorFactory } from '@loopback/core';

import { CONSTANTS } from '../constants';
import { winstonLogger as logger } from "../logger";
import { Firebase } from '../firebase';
import {JWT_SECRET, secured, SecuredType} from '../auth';
import {promisify} from 'util';
const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);



export class ShoppingController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,

    @repository(OrdersRepository)
    public ordersRepository : OrdersRepository,

    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,

    @repository(ProducttypesRepository)
    public producttypesRepository : ProducttypesRepository,

    @repository(PartnersRepository)
    public partnersRepository : PartnersRepository,

    @repository(OrderdetailsRepository)
    public orderdetailsRepository : OrderdetailsRepository,

    @repository(UserRepository)
    public userRepository : UserRepository,

  ) {}

  
  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Products model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Products, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Products)) filter?: Filter<Products>,
  ): Promise<Products[]> {

    if(filter){
      filter.order = ['displayingPeriority Asc']
    }else{
      filter = {};
      filter.order = ['displayingPeriority Asc']
    }
    // filter.where = {customersId:id};
    // filter.include = [{"relation": 'partners', 
    // scope: {fields :{"id": true, "name": true,"phone": true,"location": true,} } }
    // ];

    
    return this.productsRepository.find(filter);
  }

  
 //@secured(SecuredType.IS_AUTHENTICATED)
  @get('/shopping/protucts/type/{producttypesId}', {
    responses: {
      '200': {
        description: 'Array of Products model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Products, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findByProductTypeId(
    @param.path.string('producttypesId') producttypesId: string,
  ): Promise<Products[]> {
   
  //   let filter = {
  //     "where": { producttypesId },
  //     "fields": {}
  // };
    const filter: Filter<Products> = {};
    filter.where = {and:[{producttypesId}, {isAvailable: true}]};
    filter.order = ['displayingPeriority Asc'];
    filter.fields = {id: true, displayName: true, producttypesId: true, imageUrl: true, retailPrice: true, retailPiceUnitsId: true};

    // const tokenObject = {username: "923356666761"};
    // let token = await signAsync(tokenObject, JWT_SECRET);
    // console.log("Access token of 923356666761", token);

    return this.productsRepository.find(filter);

  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/shopping/order', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orders)}},
      },
    },
  })
  async create(
    @requestBody()
    reqData: any,
  ): Promise<any> {
    
    if(!reqData.web_customer || !reqData.web_customer.phone){
      return CONSTANTS.INVALID_PHONE_NUMBER;
    }
    
    let phone = this.validatePhone(reqData.web_customer.phone);
    if(!phone){
      return CONSTANTS.INVALID_PHONE_NUMBER; 
    }
    
       let customer = new Customers() 
       customer.name = reqData.web_customer.name;
       customer.phone= phone;
       customer.createdDate= new Date();
       customer.isWebRegistered= true;
       customer.isActivated = false;
       let ex_customer = await this.customersRepository.findOne({where:{phone: phone}});
       logger.info('customer found for web order.');
       if(!ex_customer || !ex_customer.id){
        logger.info('creating new customer for web order.');
        const tokenObject = {username: phone};
         let token = await signAsync(tokenObject, JWT_SECRET);
         customer.access_token = token;
         ex_customer = await this.customersRepository.create(customer);
         let user = await this.userRepository.create({username: phone});
       }
       let hawker = await this.partnersRepository.findOne({where:{phone: '923067625445'}});
       if(!hawker){
        return CONSTANTS.HAWKER_NOT_AVAILABLE; 
      }
       let hawkerId = '';
       let h_location :any = {};
       if(hawker != null && hawker.id != undefined){
         hawkerId = hawker.id;
         h_location = hawker.location;
         let l0 = hawker.location.coordinates[0];
         let l1 = hawker.location.coordinates[1] + 0.02;
         h_location.coordinates.push(l0);
         h_location.coordinates.push(l1);
       }
       let order = new Orders();
       order.customersId = ex_customer.id;
       order.orderStatus = 'Pending'; 
       order.orderCategory = 'CUSTOMERS';
       order.items = reqData.items;
       order.totalBillAmount = reqData.totalBillAmount;
       order.deliveredById = hawkerId;
       order.isFromWeb = true;
       order.location = h_location;
       order.house = reqData.house;
       order.street = reqData.street;
       order.address = reqData.address;
      order.orderTime = new Date();

      let orderId = '';
      let items = JSON.parse(JSON.stringify(order.items));
       let createdOrder = await this.customersRepository.orders(ex_customer.id).create(order);
      if(!createdOrder){
        return CONSTANTS.ORDER_NOT_PLACED;
      }
      if(createdOrder.id){
        orderId = createdOrder.id.toString();
      }

      let productIds = items.map((it: any) => {
        return { id: it.productId };
    });
    logger.debug('productids ', JSON.stringify(productIds));
    let products = await this.productsRepository.find({
        where: {or: productIds},
    });

  logger.debug('products for order ');
  logger.debug(JSON.stringify(products));
  if(!products){
    return CONSTANTS.PRODUCT_NOT_FOUND;
  }

  let orderdetailList : any;
  orderdetailList = [];
  
  products.forEach((pro, index) => {
      let orderdetail = new Orderdetails();
      orderdetail.ordersId = orderId;
      orderdetail.quantity = items[index].quantity;
      orderdetail.productsId = items[index].productId;
      orderdetail.retailPrice = pro.retailPrice;
      orderdetail.salePrice = pro.salePrice;
      orderdetail.purchasePrice = pro.buyingPrice;
      orderdetail.retailPriceUnitsId = pro.retailPiceUnitsId;
      orderdetail.purchasePriceUnitsId = pro.buyingPriceUnitsId;
      orderdetail.salePriceUnitsId = pro.salePriceUnitsId;
      orderdetailList.push(orderdetail);
  });
  logger.debug('orderdetailList');
  logger.debug(JSON.stringify(orderdetailList));

  if (orderdetailList.length > 0) {
      let orderDetailCreated = await this.orderdetailsRepository.createAll(orderdetailList);
      logger.debug('orderDetailCreated ', JSON.stringify(orderDetailCreated));
      if(!orderDetailCreated){
        return CONSTANTS.ORDER_DETAILS_NOT_CREATED;
      }
  }
  
  logger.debug('sending notification to Hawker!');
   if(hawker && hawker.deviceToken){
    const firebase = new Firebase();
    const payload = {
     // data: {"orderId": id, "customerId": nearestPartner.id},
      notification: {
        title: 'Kellostore',
        body: 'There is a new order at your store. Deliver it quicly.',
        sound: "default",
      }
    
    };
    firebase.sendNotification(hawker.deviceToken, payload);
   }

   //delete createdOrder.items;
   return {order: createdOrder}
      
    
    
    
  }


//validating customer mobile and making it like its requried.
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

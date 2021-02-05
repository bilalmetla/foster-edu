import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  DataSource
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customers,
  Orders,
  Products,
  Orderdetails,
  Partners
} from '../models';
import {CustomersRepository, PartnersRepository, ProductsRepository, OrderdetailsRepository, OrdersRepository} from '../repositories';
import { CONSTANTS } from '../constants';
import {secured, SecuredType} from '../auth';
import { Firebase } from '../firebase'
import { winstonLogger as logger } from "../logger";


export class CustomersOrdersController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
    @repository(PartnersRepository) protected partnersRepository: PartnersRepository,
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
    @repository(OrderdetailsRepository) protected orderdetailsRepository: OrderdetailsRepository,
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,

  ) { }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Orders\'s belonging to Customers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders, { includeRelations: true })},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[] | any> {
    
    if(filter){
      filter.order = ['orderTime Desc']
    }else{
      filter = {};
      filter.order = ['orderTime Desc']
    }
    filter.where = {customersId:id};
    filter.include = [{"relation": 'partners', 
    scope: {fields :{"id": true, "name": true,"phone": true,"location": true,} } }
    ];

    return this.customersRepository.orders(id).find(filter);
    
  }

 @secured(SecuredType.IS_AUTHENTICATED)
  @post('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orders)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrdersInCustomers',
            exclude: ['id'],
            optional: ['customersId']
          }),
        },
      },
    }) orders: Omit<Orders, 'id'>,
  ): Promise<any> {
    //return this.customersRepository.orders(id).create(orders);

  
    // fetch nearest partner
        //const partners = (this.partnersRepository.dataSource.connector as any).collection("Partners");
        if (!this.partnersRepository.dataSource.connected) {
            await this.partnersRepository.dataSource.connect();          
      }
      
      //const session = this.partnersRepository.dataSource.connector.client.startSession();
      
     // this.partnersRepository.dataSource.
     // this.partnersRepository.dataSource.beginTransaction()
      // let dataSource : DataSource;
      // let abc = dataSource.connector?.connect();
      const partnersCollection = (this.partnersRepository.dataSource.connector as any).collection("Partners");
      //  await new Promise((resolve, reject) => {
      //   partners.on('index', (error: any) => error ? reject(error) : resolve());
      //     });
    
      let nearestPartner = await partnersCollection.aggregate([
          {
              $geoNear: {
                  near: {
                      type: "Point",
                      coordinates: orders.location.coordinates
                  },
                  distanceField: "dist.calcDistance",
                  includeLocs: "dist.location",
                 // maxDistance: 2400,
                  spherical: true,
                //  limit: 1
              }
          },
          { $limit: 1 }
      ]).get();
      if (!nearestPartner || nearestPartner.length === 0) {
        return CONSTANTS.HAWKER_NOT_AVAILABLE;
       }

       
      nearestPartner = nearestPartner[0];
      logger.debug('nearestPartner ..');
      logger.debug(JSON.stringify(nearestPartner));

      //start a transaction 
      //const session = (this.customersRepository.dataSource.connector as any).client.startSession();
      //session.startTransaction();

      orders.customersId = id;
      orders.orderStatus = 'Pending'; 
      orders.orderCategory = 'CUSTOMERS';
      orders.deliveredById = nearestPartner._id || nearestPartner.id;
      orders.orderTime = new Date();
      let items = JSON.parse(JSON.stringify(orders.items));
      const createdOrder = await this.customersRepository.orders(id).create(orders);
      let orderId : string;

      if(!createdOrder){
        //await session.abortTransaction();
        //session.endSession();
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
        //await session.abortTransaction();
        //session.endSession();
        return CONSTANTS.PRODUCT_NOT_FOUND;
      }

      let orderdetailList : any;
      orderdetailList = [];
      // let orderdetailList =  Orderdetails;
      
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
          orderdetail.orderTime = new Date();
          orderdetailList.push(orderdetail);
      });
      logger.debug('orderdetailList ');
      logger.debug(JSON.stringify(orderdetailList));
      // orderdetailList = asd;
      if (orderdetailList.length > 0) {
          let orderDetailCreated = await this.orderdetailsRepository.createAll(orderdetailList);
          logger.debug('orderDetailCreated ', JSON.stringify(orderDetailCreated));
          if(!orderDetailCreated){
            //await session.abortTransaction();
            //session.endSession();
            return CONSTANTS.ORDER_DETAILS_NOT_CREATED;
          }
      }
      //await session.commitTransaction();
      //session.endSession();
      //let partnerInfo =  {id: nearestPartner.id, name: nearestPartner.name, location: nearestPartner.location, phone: nearestPartner.phone }
      //return { orderId: createdOrder.id, partner: partnerInfo  };
      //delete createdOrder.items;
      //send a notification to hawker. currently send it to kellostore default hawker.
   logger.debug('sending notification to device token ', nearestPartner.deviceToken);
   if(nearestPartner.deviceToken){
    const firebase = new Firebase();
    const payload = {
     // data: {"orderId": id, "customerId": nearestPartner.id},
      notification: {
        title: 'Kellostore',
        body: 'There is a new order at your store. Deliver it quicly.',
        sound: "default",
      }
    
    };
    firebase.sendNotification(nearestPartner.deviceToken, payload);
   }
   return {order: createdOrder, partner: nearestPartner}

  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Orders PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Partial<Orders>,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).patch(orders, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Orders DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).delete(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/orders/{orderId}/customers/{customerId}/startProgress', {
    responses: {
      '200': {
        description: 'Customers.Orders PATCH success',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async orderStartProgress(
    @param.path.string('orderId') orderId: string,
    @param.path.string('customerId') customerId: string,
      // orders: Partial<Orders>,
   // @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Orders | any> {

    let orders;
    orders = {        
        "orderStatus": "InProgress",
        "startProgressTime": new Date()        
    };
    
    await this.customersRepository.orders(customerId).patch(orders, {id:orderId});
    let customerInfo = await this.customersRepository.findById(customerId);
    if(customerInfo.deviceToken){
      const firebase = new Firebase();
      const payload = {
        data: {"orderId": orderId, "customerId": customerId},
        notification: {
          title: 'Kellostore',
          body: 'Your order is in processing now. Thanks',
          sound: "default",
        }
      
      };
      firebase.sendNotification(customerInfo.deviceToken, payload);
     }

    return {id: orderId, orderStatus: orders.orderStatus, startProgressTime: orders.startProgressTime}
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('customers/{customersId}/orders/{id}/cancellation', {
    responses: {
      '200': {
        description: 'Order Cancelled',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async orderCancellation(    
    @param.path.string('customersId') customersId: string,
    @param.path.string('id') id: string,

  ): Promise<object> {
  
    let orders;
    orders = {        
        "orderStatus": "Cancelled",
        "isCancelled": true,
        cancelTime: new Date()
    };
    //await this.ordersRepository.updateAll({where: {and:[{id:id}, {customersId: customersId}]} }, orders)
    await this.ordersRepository.updateById(id, orders);
  //  await this.customersRepository.orders(customersId).patch(orders, {id:id});
    
    return {id: id, orderStatus: orders.orderStatus, isCancelled: orders.isCancelled};
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/orders/{id}/users/{userId}/cancel', {
    responses: {
      '200': {
        description: 'Order Cancelled',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async adminOrderCancellation(    
    @param.path.string('id') id: string,
    @param.path.string('userId') userId: string,
    

  ): Promise<object> {
  
    let orders;
    orders = {        
        "orderStatus": "Cancelled",
        "isCancelled": true,
        canceledByAdminId: userId,
        cancelTime: new Date()
    };
    //await this.ordersRepository.updateAll({where: {and:[{id:id}, {customersId: customersId}]} }, orders)
    await this.ordersRepository.updateById(id, orders);
  //  await this.customersRepository.orders(customersId).patch(orders, {id:id});
    
    return {id: id, orderStatus: orders.orderStatus, isCancelled: orders.isCancelled};
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/orders/{id}/customers/{customerId}/delevered', {
    responses: {
      '200': {
        description: 'Order Delivered',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async orderDelevered(    
    @param.path.string('id') id: string,
    @param.path.string('customerId') customerId: string,
  ): Promise<object> {
    let orders;
    orders = {
        "isDelivered": true,
        "orderStatus": "Completed",
        "completionTime": new Date(),
    };
    //await this.ordersRepository.updateById(id, orders);
    await this.customersRepository.orders(customerId).patch(orders, {id:id});
    const customerInfo = await this.customersRepository.findById(customerId);
    //logger.debug("orderUpdated: ", orderUpdated);
   // orders.id = id;
   const response = { id: id, isDelivered: orders.isDelivered, orderStatus: orders.orderStatus,
    customerId: customerId };
    logger.debug('sending notification to device token ', customerInfo.deviceToken);
   if(customerInfo.deviceToken){
    const firebase = new Firebase();
    const payload = {
      data: {"orderId": id, "customerId": customerId},
      notification: {
        title: 'Kellostore',
        body: 'Thank you for your order at kellostore. Rate your order.',
        sound: "default",
      }
    
    };
    firebase.sendNotification(customerInfo.deviceToken, payload);
   }
   
    return response;
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/orders/{id}/users/{userId}', {
    responses: {
      '200': {
        description: 'Order Deleted',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async orderDeletion(    
    @param.path.string('id') id: string,
    @param.path.string('userId') userId: string,

  ): Promise<object> {
  
    let orderStatus = "Deleted";
    let isDeleted = true;

    await this.ordersRepository.updateById(id, {isDeleted, orderStatus, deletedById: userId });
    
    return {id, orderStatus, isDeleted};
  }

//  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/orders/sale/today', {
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async todaySale(    
    
  ): Promise<any> {
  
    var previousday = new Date();
    previousday.setDate(previousday.getDate() - 1);
  let orders = await this.ordersRepository.find({
      where: {
        and:[{
          orderTime: {
          gte: previousday
          //lt: new Date()
        }
      },
      {
        orderStatus : 'Completed'
      }
    ]
        
      }
    });

    let totalsale: number = 0;

    if(orders.length > 0)
    orders.forEach(or=>{
      totalsale = totalsale + or.totalBillAmount 
    });

    return {sale: totalsale}
    
    
  }

  @get('/orders/sale', {
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async totalSale(    
    
  ): Promise<any> {
  
    //var previousday = new Date();
    //previousday.setDate(previousday.getDate() - 1);
  let orders = await this.ordersRepository.find({
      where: {
        orderStatus : 'Completed'
      }
    });

    let totalsale: number = 0;

    if(orders.length > 0)
    orders.forEach(or=>{
      totalsale = totalsale + or.totalBillAmount 
    });

    return {sale: totalsale}
  }

  
  // @get('/demand/', {
  //   responses: {
  //     '200': {
  //       description: '',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'object', properties:{id: {type: "string"} }},
  //         },
  //       },
  //     },
  //   },
  // })
  // async demand(    
    
  // ): Promise<any> {
  //   const ordersCollection = (this.ordersRepository.dataSource.connector as any).collection("Orders");
  //   //  await new Promise((resolve, reject) => {
  //   //   partners.on('index', (error: any) => error ? reject(error) : resolve());
  //   //     });
  
  //   let nearestPartner = await ordersCollection.aggregate([{ $group:
  //     { _id : '$Category', sum : { $sum: "$Price" } }
  //   }]).get();  
    
  // }



}




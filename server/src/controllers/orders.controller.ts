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
import {Orders} from '../models';
import {OrdersRepository} from '../repositories';
import {secured, SecuredType} from '../auth';
import { winstonLogger as logger } from "../logger";
import { fileURLToPath } from 'url';


export class OrdersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository : OrdersRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/orders', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orders)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrders',
            exclude: ['id'],
          }),
        },
      },
    })
    orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.ordersRepository.create(orders);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/orders/count', {
    responses: {
      '200': {
        description: 'Orders model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
        
    return this.ordersRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/orders', {
    responses: {
      '200': {
        description: 'Array of Orders model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orders, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter: Filter<Orders>,
  ): Promise<Orders[]> {

    if(filter){
      filter.order = ['orderTime Desc']
    }else{
      filter = {};
      filter.order = ['orderTime Desc']
    }
    
    filter.limit = 30;
    //filter.include = [{relation:'customers'}]
    filter.include = [{"relation": 'customers', 
    scope: {fields :{"id": true, "name": true,"phone": true} } }
    ];
    
    return this.ordersRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/orders', {
    responses: {
      '200': {
        description: 'Orders PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.updateAll(orders, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/orders/{id}', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orders, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter?: Filter<Orders>
  ): Promise<Orders> {

    if(filter){
      filter.include = [{"relation": 'partners'}];
    }else{
      filter = {};
      filter.include = [{"relation": 'partners'}];
    }
    
    return this.ordersRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/orders/{id}', {
    responses: {
      '200': {
        description: 'Orders PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.updateById(id, orders);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/orders/{id}', {
    responses: {
      '204': {
        description: 'Orders PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.replaceById(id, orders);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/orders/{id}', {
    responses: {
      '200': {
        description: 'Orders DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
  
    await this.ordersRepository.deleteById(id);
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  // @patch('/orders/{id}/delevered', {
  //   responses: {
  //     '200': {
  //       description: 'Order Delivered',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'object', properties:{id: {type: "string"} }},
  //         },
  //       },
  //     },
  //   },
  // })
  // async orderDelevered(    
  //   @param.path.string('id') id: string,
  //   @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  // ): Promise<object> {
  //   let orders;
  //   orders = {
  //       "isDelivered": true,
  //       "orderStatus": "Completed",
  //       "completionTime": new Date(),
  //   };
  //   await this.ordersRepository.updateById(id, orders);
  //   //logger.debug("orderUpdated: ", orderUpdated);
  //  // orders.id = id;
  //   return {id: id, isDelivered: orders.isDelivered, orderStatus: orders.orderStatus};
  // }

  //@secured(SecuredType.IS_AUTHENTICATED)
  // @patch('customers/{customersId}/orders/{id}/cancellation', {
  //   responses: {
  //     '200': {
  //       description: 'Order Delivered',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'object', properties:{id: {type: "string"} }},
  //         },
  //       },
  //     },
  //   },
  // })
  // async orderCancellation(    
  //   @param.path.string('customersId') customersId: string,
  //   @param.path.string('id') id: string,

  // ): Promise<object> {
  
  //   let orders;
  //   orders = {        
  //       "orderStatus": "Cancelled",
  //       "isCancelled": true,
  //   };
  //   //await this.ordersRepository.updateAll({where: {and:[{id:id}, {customersId: customersId}]} }, orders)
  //   await this.ordersRepository.updateById(id, orders);
    
  //   return {id: id, orderStatus: orders.orderStatus, isCancelled: orders.isCancelled};
  // }

  // @secured(SecuredType.IS_AUTHENTICATED)
  // @put('/orders/{id}/startProgress', {
  //   responses: {
  //     '200': {
  //       description: 'Order Delivered',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'object', properties:{id: {type: "string"} }},
  //         },
  //       },
  //     },
  //   },
  // })
  // async orderStartProgress(       
  //   @param.path.string('id') id: string,

  // ): Promise<object> {
  //   let orders;
  //   orders = {        
  //       "orderStatus": "InProgress",
  //       "startProgressTime": new Date()        
  //   };
  //   await this.ordersRepository.updateById(id, orders)
    
  //   return {id: id, orderStatus: orders.orderStatus};;
  // }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('customers/{customersId}/orders/history', {
    responses: {
      '200': {
        description: 'Order History',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{customersId: {type: "string"} }},
          },
        },
      },
    },
  })
  async orderHistory(    
    @param.path.string('customersId') customersId: string,
  ): Promise<Orders[] > {
    return await this.ordersRepository.find({where:{customersId:customersId}});
    //return {id: id, orderStatus: orders.orderStatus, isCancelled: orders.isCancelled};
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/partners/{id}/orders/pending', {
    responses: {
      '200': {
        description: 'Order History',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async partnerOrderPending(    
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter: Filter<Orders>,
  ): Promise<Orders[] > {
    if(!filter){
      filter = {}
    }
    filter.where = {and:[{or:[{orderStatus: 'Pending'}, {orderStatus: 'InProgress'}]}, {deliveredById:id}] };
    filter.limit = 30;
    filter.include = [{"relation": 'customers', 
    scope: {fields :{"id": true, "name": true,"phone": true} } }]

    return await this.ordersRepository.find(filter);
    
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/partners/{id}/orders/history', {
    responses: {
      '200': {
        description: 'Partner Order History',
        content: {
          'application/json': {
            schema: {type: 'object', properties:{id: {type: "string"} }},
          },
        },
      },
    },
  })
  async partnerOrderHistory(    
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Orders)) filter: Filter<Orders>,
  ): Promise<Orders[] > {
    if(!filter){
      filter = {}
    }
    filter.where = {and:[{orderStatus: 'Completed'}, {deliveredById:id}] };
    filter.limit = 25;
    filter.include = [{"relation": 'customers', 
    scope: {fields :{"id": true, "name": true,"phone": true} } }]

    return await this.ordersRepository.find(filter);
    
  }


}

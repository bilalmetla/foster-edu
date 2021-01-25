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
import {OrderRatings} from '../models';
import {OrderRatingsRepository, OrdersRepository} from '../repositories';
import {secured, SecuredType} from '../auth';


export class OrderRatingsController {
  constructor(
    @repository(OrderRatingsRepository)
    public orderRatingsRepository : OrderRatingsRepository,
    @repository(OrdersRepository)
    public ordersRepository : OrdersRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/order-ratings', {
    responses: {
      '200': {
        description: 'OrderRatings model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderRatings)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderRatings, {
            title: 'NewOrderRatings',
            exclude: ['id'],
          }),
        },
      },
    })
    orderRatings: OrderRatings[],
  ): Promise<any> {
       
    //let orderIds: any = [];
  orderRatings.forEach(item => this.ordersRepository.updateById(item.ordersId, {isOrderRatingDone : true}) );

  orderRatings.forEach((or, index)=>{
    orderRatings[index].createdDate = new Date();
  });

  return this.orderRatingsRepository.createAll(orderRatings);

  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings/count', {
    responses: {
      '200': {
        description: 'OrderRatings model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(OrderRatings)) where?: Where<OrderRatings>,
  ): Promise<Count> {
    return this.orderRatingsRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings', {
    responses: {
      '200': {
        description: 'Array of OrderRatings model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrderRatings, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(OrderRatings)) filter?: Filter<OrderRatings>,
  ): Promise<OrderRatings[]> {
    if(filter){
      filter.order = ['createdDate Desc']
    }else{
      filter = {};
      filter.order = ['createdDate Desc']
    }
    return this.orderRatingsRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/order-ratings', {
    responses: {
      '200': {
        description: 'OrderRatings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderRatings, {partial: true}),
        },
      },
    })
    orderRatings: OrderRatings,
    @param.query.object('where', getWhereSchemaFor(OrderRatings)) where?: Where<OrderRatings>,
  ): Promise<Count> {
    return this.orderRatingsRepository.updateAll(orderRatings, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings/{id}', {
    responses: {
      '200': {
        description: 'OrderRatings model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrderRatings, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(OrderRatings)) filter?: Filter<OrderRatings>
  ): Promise<OrderRatings> {
    return this.orderRatingsRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/order-ratings/{id}', {
    responses: {
      '204': {
        description: 'OrderRatings PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderRatings, {partial: true}),
        },
      },
    })
    orderRatings: OrderRatings,
  ): Promise<void> {
    await this.orderRatingsRepository.updateById(id, orderRatings);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/order-ratings/{id}', {
    responses: {
      '204': {
        description: 'OrderRatings PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderRatings: OrderRatings,
  ): Promise<void> {
    await this.orderRatingsRepository.replaceById(id, orderRatings);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/order-ratings/{id}', {
    responses: {
      '204': {
        description: 'OrderRatings DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderRatingsRepository.deleteById(id);
  }
}

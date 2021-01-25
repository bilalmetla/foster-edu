import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderRatings,
  Orders,
} from '../models';
import {OrderRatingsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';



export class OrderRatingsOrdersController {
  constructor(
    @repository(OrderRatingsRepository)
    public orderRatingsRepository: OrderRatingsRepository,
  ) { }


  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to OrderRatings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.string('id') id: typeof OrderRatings.prototype.id,
  ): Promise<Orders> {
    return this.orderRatingsRepository.orders(id);
  }
}

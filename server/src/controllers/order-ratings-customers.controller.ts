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
  Customers,
} from '../models';
import {OrderRatingsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';


export class OrderRatingsCustomersController {
  constructor(
    @repository(OrderRatingsRepository)
    public orderRatingsRepository: OrderRatingsRepository,
  ) { }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to OrderRatings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.string('id') id: typeof OrderRatings.prototype.id,
  ): Promise<Customers> {
    return this.orderRatingsRepository.customers(id);
  }
}

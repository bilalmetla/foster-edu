import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orders,
  Orderstatuses,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersOrderstatusesController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/orderstatuses', {
    responses: {
      '200': {
        description: 'Orderstatuses belonging to Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orderstatuses)},
          },
        },
      },
    },
  })
  async getOrderstatuses(
    @param.path.string('id') id: typeof Orders.prototype.id,
  ): Promise<Orderstatuses> {
    return this.ordersRepository.orderstatuses(id);
  }
}

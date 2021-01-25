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
  Partners,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersPartnersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/partners', {
    responses: {
      '200': {
        description: 'Partners belonging to Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partners)},
          },
        },
      },
    },
  })
  async getPartners(
    @param.path.string('id') id: typeof Orders.prototype.id,
  ): Promise<Partners> {
    return this.ordersRepository.partners(id);
  }
}

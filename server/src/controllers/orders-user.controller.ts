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
  User,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersUserController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Orders.prototype.id,
  ): Promise<User> {
    return this.ordersRepository.user(id);
  }
}

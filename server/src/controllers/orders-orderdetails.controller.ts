import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
  Orders,
  Orderdetails,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersOrderdetailsController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/orderdetails', {
    responses: {
      '200': {
        description: 'Array of Orderdetails\'s belonging to Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orderdetails)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Orderdetails>,
  ): Promise<Orderdetails[]> {
    return this.ordersRepository.orderdetails(id).find(filter);
  }

  @post('/orders/{id}/orderdetails', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orderdetails)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderdetails, {
            title: 'NewOrderdetailsInOrders',
            exclude: ['id'],
            optional: ['ordersId']
          }),
        },
      },
    }) orderdetails: Omit<Orderdetails, 'id'>,
  ): Promise<Orderdetails> {
    return this.ordersRepository.orderdetails(id).create(orderdetails);
  }

  @patch('/orders/{id}/orderdetails', {
    responses: {
      '200': {
        description: 'Orders.Orderdetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderdetails, {partial: true}),
        },
      },
    })
    orderdetails: Partial<Orderdetails>,
    @param.query.object('where', getWhereSchemaFor(Orderdetails)) where?: Where<Orderdetails>,
  ): Promise<Count> {
    return this.ordersRepository.orderdetails(id).patch(orderdetails, where);
  }

  @del('/orders/{id}/orderdetails', {
    responses: {
      '200': {
        description: 'Orders.Orderdetails DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Orderdetails)) where?: Where<Orderdetails>,
  ): Promise<Count> {
    return this.ordersRepository.orderdetails(id).delete(where);
  }
}

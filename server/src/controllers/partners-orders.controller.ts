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
  Partners,
  Orders,
} from '../models';
import {PartnersRepository} from '../repositories';

export class PartnersOrdersController {
  constructor(
    @repository(PartnersRepository) protected partnersRepository: PartnersRepository,
  ) { }

  @get('/partners/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Orders\'s belonging to Partners',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.partnersRepository.orders(id).find(filter);
  }

  @post('/partners/{id}/orders', {
    responses: {
      '200': {
        description: 'Partners model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orders)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Partners.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrdersInPartners',
            exclude: ['id'],
            optional: ['partnersId']
          }),
        },
      },
    }) orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.partnersRepository.orders(id).create(orders);
  }

  @patch('/partners/{id}/orders', {
    responses: {
      '200': {
        description: 'Partners.Orders PATCH success count',
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
    return this.partnersRepository.orders(id).patch(orders, where);
  }

  @del('/partners/{id}/orders', {
    responses: {
      '200': {
        description: 'Partners.Orders DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.partnersRepository.orders(id).delete(where);
  }
}

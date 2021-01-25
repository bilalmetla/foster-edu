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
import {Orderstatuses} from '../models';
import {OrderstatusesRepository} from '../repositories';

export class OrderstatusesController {
  constructor(
    @repository(OrderstatusesRepository)
    public orderstatusesRepository : OrderstatusesRepository,
  ) {}

  @post('/orderstatuses', {
    responses: {
      '200': {
        description: 'Orderstatuses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orderstatuses)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderstatuses, {
            title: 'NewOrderstatuses',
            exclude: ['id'],
          }),
        },
      },
    })
    orderstatuses: Omit<Orderstatuses, 'id'>,
  ): Promise<Orderstatuses> {
    return this.orderstatusesRepository.create(orderstatuses);
  }

  @get('/orderstatuses/count', {
    responses: {
      '200': {
        description: 'Orderstatuses model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Orderstatuses)) where?: Where<Orderstatuses>,
  ): Promise<Count> {
    return this.orderstatusesRepository.count(where);
  }

  @get('/orderstatuses', {
    responses: {
      '200': {
        description: 'Array of Orderstatuses model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orderstatuses, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Orderstatuses)) filter?: Filter<Orderstatuses>,
  ): Promise<Orderstatuses[]> {
    return this.orderstatusesRepository.find(filter);
  }

  @patch('/orderstatuses', {
    responses: {
      '200': {
        description: 'Orderstatuses PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderstatuses, {partial: true}),
        },
      },
    })
    orderstatuses: Orderstatuses,
    @param.query.object('where', getWhereSchemaFor(Orderstatuses)) where?: Where<Orderstatuses>,
  ): Promise<Count> {
    return this.orderstatusesRepository.updateAll(orderstatuses, where);
  }

  @get('/orderstatuses/{id}', {
    responses: {
      '200': {
        description: 'Orderstatuses model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orderstatuses, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Orderstatuses)) filter?: Filter<Orderstatuses>
  ): Promise<Orderstatuses> {
    return this.orderstatusesRepository.findById(id, filter);
  }

  @patch('/orderstatuses/{id}', {
    responses: {
      '204': {
        description: 'Orderstatuses PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderstatuses, {partial: true}),
        },
      },
    })
    orderstatuses: Orderstatuses,
  ): Promise<void> {
    await this.orderstatusesRepository.updateById(id, orderstatuses);
  }

  @put('/orderstatuses/{id}', {
    responses: {
      '204': {
        description: 'Orderstatuses PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderstatuses: Orderstatuses,
  ): Promise<void> {
    await this.orderstatusesRepository.replaceById(id, orderstatuses);
  }

  @del('/orderstatuses/{id}', {
    responses: {
      '204': {
        description: 'Orderstatuses DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderstatusesRepository.deleteById(id);
  }
}

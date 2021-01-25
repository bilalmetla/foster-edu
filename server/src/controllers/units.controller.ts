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
import {Units} from '../models';
import {UnitsRepository} from '../repositories';

export class UnitsController {
  constructor(
    @repository(UnitsRepository)
    public unitsRepository : UnitsRepository,
  ) {}

  @post('/units', {
    responses: {
      '200': {
        description: 'Units model instance',
        content: {'application/json': {schema: getModelSchemaRef(Units)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Units, {
            title: 'NewUnits',
            exclude: ['id'],
          }),
        },
      },
    })
    units: Omit<Units, 'id'>,
  ): Promise<Units> {
    return this.unitsRepository.create(units);
  }

  @get('/units/count', {
    responses: {
      '200': {
        description: 'Units model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Units)) where?: Where<Units>,
  ): Promise<Count> {
    return this.unitsRepository.count(where);
  }

  @get('/units', {
    responses: {
      '200': {
        description: 'Array of Units model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Units, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Units)) filter?: Filter<Units>,
  ): Promise<Units[]> {
    return this.unitsRepository.find(filter);
  }

  @patch('/units', {
    responses: {
      '200': {
        description: 'Units PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Units, {partial: true}),
        },
      },
    })
    units: Units,
    @param.query.object('where', getWhereSchemaFor(Units)) where?: Where<Units>,
  ): Promise<Count> {
    return this.unitsRepository.updateAll(units, where);
  }

  @get('/units/{id}', {
    responses: {
      '200': {
        description: 'Units model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Units, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Units)) filter?: Filter<Units>
  ): Promise<Units> {
    return this.unitsRepository.findById(id, filter);
  }

  @patch('/units/{id}', {
    responses: {
      '204': {
        description: 'Units PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Units, {partial: true}),
        },
      },
    })
    units: Units,
  ): Promise<void> {
    await this.unitsRepository.updateById(id, units);
  }

  @put('/units/{id}', {
    responses: {
      '204': {
        description: 'Units PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() units: Units,
  ): Promise<void> {
    await this.unitsRepository.replaceById(id, units);
  }

  @del('/units/{id}', {
    responses: {
      '204': {
        description: 'Units DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.unitsRepository.deleteById(id);
  }
}

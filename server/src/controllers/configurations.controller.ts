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
import {Configurations} from '../models';
import {ConfigurationsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';



export class ConfigurationsController {
  constructor(
    @repository(ConfigurationsRepository)
    public configurationsRepository : ConfigurationsRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/configurations', {
    responses: {
      '200': {
        description: 'Configurations model instance',
        content: {'application/json': {schema: getModelSchemaRef(Configurations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Configurations, {
            title: 'NewConfigurations',
            exclude: ['id'],
          }),
        },
      },
    })
    configurations: Omit<Configurations, 'id'>,
  ): Promise<Configurations> {
    return this.configurationsRepository.create(configurations);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/configurations/count', {
    responses: {
      '200': {
        description: 'Configurations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Configurations)) where?: Where<Configurations>,
  ): Promise<Count> {
    return this.configurationsRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/configurations', {
    responses: {
      '200': {
        description: 'Array of Configurations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Configurations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Configurations)) filter?: Filter<Configurations>,
  ): Promise<Configurations[]> {
    return this.configurationsRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/configurations', {
    responses: {
      '200': {
        description: 'Configurations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Configurations, {partial: true}),
        },
      },
    })
    configurations: Configurations,
    @param.query.object('where', getWhereSchemaFor(Configurations)) where?: Where<Configurations>,
  ): Promise<Count> {
    return this.configurationsRepository.updateAll(configurations, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/configurations/{id}', {
    responses: {
      '200': {
        description: 'Configurations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Configurations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Configurations)) filter?: Filter<Configurations>
  ): Promise<Configurations> {
    return this.configurationsRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configurations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Configurations, {partial: true}),
        },
      },
    })
    configurations: Configurations,
  ): Promise<void> {
    await this.configurationsRepository.updateById(id, configurations);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configurations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() configurations: Configurations,
  ): Promise<void> {
    await this.configurationsRepository.replaceById(id, configurations);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configurations DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.configurationsRepository.deleteById(id);
  }
}



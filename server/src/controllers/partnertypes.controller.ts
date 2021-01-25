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
import {Partnertypes} from '../models';
import {PartnertypesRepository} from '../repositories';

export class PartnertypesController {
  constructor(
    @repository(PartnertypesRepository)
    public partnertypesRepository : PartnertypesRepository,
  ) {}

  @post('/partnertypes', {
    responses: {
      '200': {
        description: 'Partnertypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partnertypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partnertypes, {
            title: 'NewPartnertypes',
            exclude: ['id'],
          }),
        },
      },
    })
    partnertypes: Omit<Partnertypes, 'id'>,
  ): Promise<Partnertypes> {
    return this.partnertypesRepository.create(partnertypes);
  }

  @get('/partnertypes/count', {
    responses: {
      '200': {
        description: 'Partnertypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Partnertypes)) where?: Where<Partnertypes>,
  ): Promise<Count> {
    return this.partnertypesRepository.count(where);
  }

  @get('/partnertypes', {
    responses: {
      '200': {
        description: 'Array of Partnertypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Partnertypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Partnertypes)) filter?: Filter<Partnertypes>,
  ): Promise<Partnertypes[]> {
    return this.partnertypesRepository.find(filter);
  }

  @patch('/partnertypes', {
    responses: {
      '200': {
        description: 'Partnertypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partnertypes, {partial: true}),
        },
      },
    })
    partnertypes: Partnertypes,
    @param.query.object('where', getWhereSchemaFor(Partnertypes)) where?: Where<Partnertypes>,
  ): Promise<Count> {
    return this.partnertypesRepository.updateAll(partnertypes, where);
  }

  @get('/partnertypes/{id}', {
    responses: {
      '200': {
        description: 'Partnertypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partnertypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Partnertypes)) filter?: Filter<Partnertypes>
  ): Promise<Partnertypes> {
    return this.partnertypesRepository.findById(id, filter);
  }

  @patch('/partnertypes/{id}', {
    responses: {
      '204': {
        description: 'Partnertypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partnertypes, {partial: true}),
        },
      },
    })
    partnertypes: Partnertypes,
  ): Promise<void> {
    await this.partnertypesRepository.updateById(id, partnertypes);
  }

  @put('/partnertypes/{id}', {
    responses: {
      '204': {
        description: 'Partnertypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partnertypes: Partnertypes,
  ): Promise<void> {
    await this.partnertypesRepository.replaceById(id, partnertypes);
  }

  @del('/partnertypes/{id}', {
    responses: {
      '204': {
        description: 'Partnertypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partnertypesRepository.deleteById(id);
  }
}

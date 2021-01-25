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
import {Feedbacktypes} from '../models';
import {FeedbacktypesRepository} from '../repositories';

export class FeedbacktypesController {
  constructor(
    @repository(FeedbacktypesRepository)
    public feedbacktypesRepository : FeedbacktypesRepository,
  ) {}

  @post('/feedbacktypes', {
    responses: {
      '200': {
        description: 'Feedbacktypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Feedbacktypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedbacktypes, {
            title: 'NewFeedbacktypes',
            exclude: ['id'],
          }),
        },
      },
    })
    feedbacktypes: Omit<Feedbacktypes, 'id'>,
  ): Promise<Feedbacktypes> {
    return this.feedbacktypesRepository.create(feedbacktypes);
  }

  @get('/feedbacktypes/count', {
    responses: {
      '200': {
        description: 'Feedbacktypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Feedbacktypes)) where?: Where<Feedbacktypes>,
  ): Promise<Count> {
    return this.feedbacktypesRepository.count(where);
  }

  @get('/feedbacktypes', {
    responses: {
      '200': {
        description: 'Array of Feedbacktypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Feedbacktypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Feedbacktypes)) filter?: Filter<Feedbacktypes>,
  ): Promise<Feedbacktypes[]> {
    return this.feedbacktypesRepository.find(filter);
  }

  @patch('/feedbacktypes', {
    responses: {
      '200': {
        description: 'Feedbacktypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedbacktypes, {partial: true}),
        },
      },
    })
    feedbacktypes: Feedbacktypes,
    @param.query.object('where', getWhereSchemaFor(Feedbacktypes)) where?: Where<Feedbacktypes>,
  ): Promise<Count> {
    return this.feedbacktypesRepository.updateAll(feedbacktypes, where);
  }

  @get('/feedbacktypes/{id}', {
    responses: {
      '200': {
        description: 'Feedbacktypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Feedbacktypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Feedbacktypes)) filter?: Filter<Feedbacktypes>
  ): Promise<Feedbacktypes> {
    return this.feedbacktypesRepository.findById(id, filter);
  }

  @patch('/feedbacktypes/{id}', {
    responses: {
      '204': {
        description: 'Feedbacktypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedbacktypes, {partial: true}),
        },
      },
    })
    feedbacktypes: Feedbacktypes,
  ): Promise<void> {
    await this.feedbacktypesRepository.updateById(id, feedbacktypes);
  }

  @put('/feedbacktypes/{id}', {
    responses: {
      '204': {
        description: 'Feedbacktypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() feedbacktypes: Feedbacktypes,
  ): Promise<void> {
    await this.feedbacktypesRepository.replaceById(id, feedbacktypes);
  }

  @del('/feedbacktypes/{id}', {
    responses: {
      '204': {
        description: 'Feedbacktypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.feedbacktypesRepository.deleteById(id);
  }
}

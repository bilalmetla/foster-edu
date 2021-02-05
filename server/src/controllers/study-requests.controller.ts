import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {StudyRequests} from '../models';
import {StudyRequestsRepository} from '../repositories';

export class StudyRequestsController {
  constructor(
    @repository(StudyRequestsRepository)
    public studyRequestsRepository : StudyRequestsRepository,
  ) {}

  @post('/study-requests', {
    responses: {
      '200': {
        description: 'StudyRequests model instance',
        content: {'application/json': {schema: getModelSchemaRef(StudyRequests)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudyRequests, {
            title: 'NewStudyRequests',
            exclude: ['id'],
          }),
        },
      },
    })
    studyRequests: Omit<StudyRequests, 'id'>,
  ): Promise<StudyRequests> {
    return this.studyRequestsRepository.create(studyRequests);
  }

  @get('/study-requests/count', {
    responses: {
      '200': {
        description: 'StudyRequests model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(StudyRequests) where?: Where<StudyRequests>,
  ): Promise<Count> {
    return this.studyRequestsRepository.count(where);
  }

  @get('/study-requests', {
    responses: {
      '200': {
        description: 'Array of StudyRequests model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(StudyRequests, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(StudyRequests) filter?: Filter<StudyRequests>,
  ): Promise<StudyRequests[]> {
    return this.studyRequestsRepository.find(filter, {strictObjectIDCoercion:true});
  }

  @patch('/study-requests', {
    responses: {
      '200': {
        description: 'StudyRequests PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudyRequests, {partial: true}),
        },
      },
    })
    studyRequests: StudyRequests,
    @param.where(StudyRequests) where?: Where<StudyRequests>,
  ): Promise<Count> {
    return this.studyRequestsRepository.updateAll(studyRequests, where);
  }

  @get('/study-requests/{id}', {
    responses: {
      '200': {
        description: 'StudyRequests model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(StudyRequests, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(StudyRequests, {exclude: 'where'}) filter?: FilterExcludingWhere<StudyRequests>
  ): Promise<StudyRequests> {
    return this.studyRequestsRepository.findById(id, filter);
  }

  @patch('/study-requests/{id}', {
    responses: {
      '204': {
        description: 'StudyRequests PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StudyRequests, {partial: true}),
        },
      },
    })
    studyRequests: StudyRequests,
  ): Promise<void> {
    await this.studyRequestsRepository.updateById(id, studyRequests);
  }

  @put('/study-requests/{id}', {
    responses: {
      '204': {
        description: 'StudyRequests PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() studyRequests: StudyRequests,
  ): Promise<void> {
    await this.studyRequestsRepository.replaceById(id, studyRequests);
  }

  @del('/study-requests/{id}', {
    responses: {
      '204': {
        description: 'StudyRequests DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studyRequestsRepository.deleteById(id);
  }
}

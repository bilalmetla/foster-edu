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
import {Classes} from '../models';
import {ClassesRepository} from '../repositories';

export class ClassesController {
  constructor(
    @repository(ClassesRepository)
    public classesRepository : ClassesRepository,
  ) {}

  @post('/classes', {
    responses: {
      '200': {
        description: 'Classes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Classes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classes, {
            title: 'NewClasses',
            exclude: ['id'],
          }),
        },
      },
    })
    classes: Omit<Classes, 'id'>,
  ): Promise<Classes> {
    return this.classesRepository.create(classes);
  }

  @get('/classes/count', {
    responses: {
      '200': {
        description: 'Classes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Classes) where?: Where<Classes>,
  ): Promise<Count> {
    return this.classesRepository.count(where);
  }

  @get('/classes', {
    responses: {
      '200': {
        description: 'Array of Classes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Classes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Classes) filter?: Filter<Classes>,
  ): Promise<Classes[]> {
    return this.classesRepository.find(filter);
  }

  @patch('/classes', {
    responses: {
      '200': {
        description: 'Classes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classes, {partial: true}),
        },
      },
    })
    classes: Classes,
    @param.where(Classes) where?: Where<Classes>,
  ): Promise<Count> {
    return this.classesRepository.updateAll(classes, where);
  }

  @get('/classes/{id}', {
    responses: {
      '200': {
        description: 'Classes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Classes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Classes, {exclude: 'where'}) filter?: FilterExcludingWhere<Classes>
  ): Promise<Classes> {
    return this.classesRepository.findById(id, filter);
  }

  @patch('/classes/{id}', {
    responses: {
      '204': {
        description: 'Classes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classes, {partial: true}),
        },
      },
    })
    classes: Classes,
  ): Promise<void> {
    await this.classesRepository.updateById(id, classes);
  }

  @put('/classes/{id}', {
    responses: {
      '204': {
        description: 'Classes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() classes: Classes,
  ): Promise<void> {
    await this.classesRepository.replaceById(id, classes);
  }

  @del('/classes/{id}', {
    responses: {
      '204': {
        description: 'Classes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.classesRepository.deleteById(id);
  }
}

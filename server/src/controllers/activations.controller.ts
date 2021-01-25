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
import {Activations} from '../models';
import {ActivationsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';


export class ActivationsController {
  constructor(
    @repository(ActivationsRepository)
    public activationsRepository : ActivationsRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/activations', {
    responses: {
      '200': {
        description: 'Activations model instance',
        content: {'application/json': {schema: getModelSchemaRef(Activations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activations, {
            title: 'NewActivations',
            exclude: ['id'],
          }),
        },
      },
    })
    activations: Omit<Activations, 'id'>,
  ): Promise<Activations> {
    return this.activationsRepository.create(activations);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/activations/count', {
    responses: {
      '200': {
        description: 'Activations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Activations)) where?: Where<Activations>,
  ): Promise<Count> {
    return this.activationsRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/activations', {
    responses: {
      '200': {
        description: 'Array of Activations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Activations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  
  async find(
    @param.query.object('filter', getFilterSchemaFor(Activations)) filter?: Filter<Activations>,
  ): Promise<Activations[]> {

    if(filter){
      filter.order = ['createdTime Desc']
    }else{
      filter = {};
      filter.order = ['createdTime Desc']
    }
    //filter.where = {id: "232323232323"}
    return this.activationsRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/activations', {
    responses: {
      '200': {
        description: 'Activations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activations, {partial: true}),
        },
      },
    })
    activations: Activations,
    @param.query.object('where', getWhereSchemaFor(Activations)) where?: Where<Activations>,
  ): Promise<Count> {
    return this.activationsRepository.updateAll(activations, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/activations/{id}', {
    responses: {
      '200': {
        description: 'Activations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Activations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Activations)) filter?: Filter<Activations>
  ): Promise<Activations> {
    return this.activationsRepository.findById(id, filter);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/activations/{id}', {
    responses: {
      '204': {
        description: 'Activations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activations, {partial: true}),
        },
      },
    })
    activations: Activations,
  ): Promise<void> {
    await this.activationsRepository.updateById(id, activations);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/activations/{id}', {
    responses: {
      '204': {
        description: 'Activations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() activations: Activations,
  ): Promise<void> {
    await this.activationsRepository.replaceById(id, activations);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/activations/{id}', {
    responses: {
      '204': {
        description: 'Activations DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.activationsRepository.deleteById(id);
  }
}

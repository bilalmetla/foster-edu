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
import {Accounttypes} from '../models';
import {AccounttypesRepository} from '../repositories';

export class AccounttypesController {
  constructor(
    @repository(AccounttypesRepository)
    public accounttypesRepository : AccounttypesRepository,
  ) {}

  @post('/accounttypes', {
    responses: {
      '200': {
        description: 'Accounttypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Accounttypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounttypes, {
            title: 'NewAccounttypes',
            exclude: ['id'],
          }),
        },
      },
    })
    accounttypes: Omit<Accounttypes, 'id'>,
  ): Promise<Accounttypes> {
    return this.accounttypesRepository.create(accounttypes);
  }

  @get('/accounttypes/count', {
    responses: {
      '200': {
        description: 'Accounttypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Accounttypes)) where?: Where<Accounttypes>,
  ): Promise<Count> {
    return this.accounttypesRepository.count(where);
  }

  @get('/accounttypes', {
    responses: {
      '200': {
        description: 'Array of Accounttypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Accounttypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Accounttypes)) filter?: Filter<Accounttypes>,
  ): Promise<Accounttypes[]> {
    return this.accounttypesRepository.find(filter);
  }

  @patch('/accounttypes', {
    responses: {
      '200': {
        description: 'Accounttypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounttypes, {partial: true}),
        },
      },
    })
    accounttypes: Accounttypes,
    @param.query.object('where', getWhereSchemaFor(Accounttypes)) where?: Where<Accounttypes>,
  ): Promise<Count> {
    return this.accounttypesRepository.updateAll(accounttypes, where);
  }

  @get('/accounttypes/{id}', {
    responses: {
      '200': {
        description: 'Accounttypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accounttypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Accounttypes)) filter?: Filter<Accounttypes>
  ): Promise<Accounttypes> {
    return this.accounttypesRepository.findById(id, filter);
  }

  @patch('/accounttypes/{id}', {
    responses: {
      '204': {
        description: 'Accounttypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounttypes, {partial: true}),
        },
      },
    })
    accounttypes: Accounttypes,
  ): Promise<void> {
    await this.accounttypesRepository.updateById(id, accounttypes);
  }

  @put('/accounttypes/{id}', {
    responses: {
      '204': {
        description: 'Accounttypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() accounttypes: Accounttypes,
  ): Promise<void> {
    await this.accounttypesRepository.replaceById(id, accounttypes);
  }

  @del('/accounttypes/{id}', {
    responses: {
      '204': {
        description: 'Accounttypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accounttypesRepository.deleteById(id);
  }
}

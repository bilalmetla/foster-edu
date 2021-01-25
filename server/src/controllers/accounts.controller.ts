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
import {Accounts} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsController {
  constructor(
    @repository(AccountsRepository)
    public accountsRepository : AccountsRepository,
  ) {}

  @post('/accounts', {
    responses: {
      '200': {
        description: 'Accounts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Accounts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {
            title: 'NewAccounts',
            exclude: ['id'],
          }),
        },
      },
    })
    accounts: Omit<Accounts, 'id'>,
  ): Promise<Accounts> {
    return this.accountsRepository.create(accounts);
  }

  @get('/accounts/count', {
    responses: {
      '200': {
        description: 'Accounts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Accounts)) where?: Where<Accounts>,
  ): Promise<Count> {
    
    return this.accountsRepository.count(where);
  }

  @get('/accounts', {
    responses: {
      '200': {
        description: 'Array of Accounts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Accounts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Accounts)) filter?: Filter<Accounts>,
  ): Promise<Accounts[]> {
    if(filter){
      filter.order = ['createdTime Desc']
    }else{
      filter = {};
      filter.order = ['createdTime Desc']
    }
    return this.accountsRepository.find(filter);
  }

  @patch('/accounts', {
    responses: {
      '200': {
        description: 'Accounts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {partial: true}),
        },
      },
    })
    accounts: Accounts,
    @param.query.object('where', getWhereSchemaFor(Accounts)) where?: Where<Accounts>,
  ): Promise<Count> {
    return this.accountsRepository.updateAll(accounts, where);
  }

  @get('/accounts/{id}', {
    responses: {
      '200': {
        description: 'Accounts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accounts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Accounts)) filter?: Filter<Accounts>
  ): Promise<Accounts> {
    return this.accountsRepository.findById(id, filter);
  }

  @patch('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Accounts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {partial: true}),
        },
      },
    })
    accounts: Accounts,
  ): Promise<void> {
    await this.accountsRepository.updateById(id, accounts);
  }

  @put('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Accounts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() accounts: Accounts,
  ): Promise<void> {
    await this.accountsRepository.replaceById(id, accounts);
  }

  @del('/accounts/{id}', {
    responses: {
      '204': {
        description: 'Accounts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accountsRepository.deleteById(id);
  }
}

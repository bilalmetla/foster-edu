import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Accounts,
  Customers,
} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsCustomersController {
  constructor(
    @repository(AccountsRepository)
    public accountsRepository: AccountsRepository,
  ) { }

  @get('/accounts/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Accounts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.string('id') id: typeof Accounts.prototype.id,
  ): Promise<Customers> {
    return this.accountsRepository.customers(id);
  }
}

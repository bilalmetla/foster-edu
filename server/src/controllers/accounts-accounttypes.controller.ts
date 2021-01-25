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
  Accounttypes,
} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsAccounttypesController {
  constructor(
    @repository(AccountsRepository)
    public accountsRepository: AccountsRepository,
  ) { }

  @get('/accounts/{id}/accounttypes', {
    responses: {
      '200': {
        description: 'Accounttypes belonging to Accounts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Accounttypes)},
          },
        },
      },
    },
  })
  async getAccounttypes(
    @param.path.string('id') id: typeof Accounts.prototype.id,
  ): Promise<Accounttypes> {
    return this.accountsRepository.accounttypes(id);
  }
}

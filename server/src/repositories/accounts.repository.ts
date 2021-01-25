import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Accounts, AccountsRelations, Accounttypes, Customers} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AccounttypesRepository} from './accounttypes.repository';
import {CustomersRepository} from './customers.repository';

export class AccountsRepository extends DefaultCrudRepository<
  Accounts,
  typeof Accounts.prototype.id,
  AccountsRelations
> {

  public readonly accounttypes: BelongsToAccessor<Accounttypes, typeof Accounts.prototype.id>;

  public readonly customers: BelongsToAccessor<Customers, typeof Accounts.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('AccounttypesRepository') protected accounttypesRepositoryGetter: Getter<AccounttypesRepository>, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(Accounts, dataSource);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    this.accounttypes = this.createBelongsToAccessorFor('accounttypes', accounttypesRepositoryGetter,);
    this.registerInclusionResolver('accounttypes', this.accounttypes.inclusionResolver);
  }
}

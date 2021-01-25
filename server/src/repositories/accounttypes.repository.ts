import {DefaultCrudRepository} from '@loopback/repository';
import {Accounttypes, AccounttypesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AccounttypesRepository extends DefaultCrudRepository<
  Accounttypes,
  typeof Accounttypes.prototype.id,
  AccounttypesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Accounttypes, dataSource);
  }
}

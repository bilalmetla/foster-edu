import {DefaultCrudRepository} from '@loopback/repository';
import {Units, UnitsRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UnitsRepository extends DefaultCrudRepository<
  Units,
  typeof Units.prototype.id,
  UnitsRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Units, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Producttypes, ProducttypesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProducttypesRepository extends DefaultCrudRepository<
  Producttypes,
  typeof Producttypes.prototype.id,
  ProducttypesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Producttypes, dataSource);
  }
}

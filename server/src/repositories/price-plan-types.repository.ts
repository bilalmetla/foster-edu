import {DefaultCrudRepository} from '@loopback/repository';
import {PricePlanTypes, PricePlanTypesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PricePlanTypesRepository extends DefaultCrudRepository<
  PricePlanTypes,
  typeof PricePlanTypes.prototype.id,
  PricePlanTypesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(PricePlanTypes, dataSource);
  }
}

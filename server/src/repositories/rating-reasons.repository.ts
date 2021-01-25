import {DefaultCrudRepository} from '@loopback/repository';
import {RatingReasons, RatingReasonsRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RatingReasonsRepository extends DefaultCrudRepository<
  RatingReasons,
  typeof RatingReasons.prototype.id,
  RatingReasonsRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(RatingReasons, dataSource);
  }
}

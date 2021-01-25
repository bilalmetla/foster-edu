import {DefaultCrudRepository} from '@loopback/repository';
import {Feedbacktypes, FeedbacktypesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FeedbacktypesRepository extends DefaultCrudRepository<
  Feedbacktypes,
  typeof Feedbacktypes.prototype.id,
  FeedbacktypesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Feedbacktypes, dataSource);
  }
}

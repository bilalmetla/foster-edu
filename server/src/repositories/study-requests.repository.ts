import {DefaultCrudRepository} from '@loopback/repository';
import {StudyRequests, StudyRequestsRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StudyRequestsRepository extends DefaultCrudRepository<
  StudyRequests,
  typeof StudyRequests.prototype.id,
  StudyRequestsRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(StudyRequests, dataSource);
  }
}

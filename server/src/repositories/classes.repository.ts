import {DefaultCrudRepository} from '@loopback/repository';
import {Classes, ClassesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClassesRepository extends DefaultCrudRepository<
  Classes,
  typeof Classes.prototype.id,
  ClassesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Classes, dataSource);
  }
}

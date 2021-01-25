import {DefaultCrudRepository} from '@loopback/repository';
import {Activations, ActivationsRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActivationsRepository extends DefaultCrudRepository<
  Activations,
  typeof Activations.prototype.id,
  ActivationsRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Activations, dataSource);
  }
}

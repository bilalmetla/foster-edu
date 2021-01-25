import {DefaultCrudRepository} from '@loopback/repository';
import {Partnertypes, PartnertypesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PartnertypesRepository extends DefaultCrudRepository<
  Partnertypes,
  typeof Partnertypes.prototype.id,
  PartnertypesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Partnertypes, dataSource);
  }
}

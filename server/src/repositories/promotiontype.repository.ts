import {DefaultCrudRepository} from '@loopback/repository';
import {Promotiontype, PromotiontypeRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PromotiontypeRepository extends DefaultCrudRepository<
  Promotiontype,
  typeof Promotiontype.prototype.id,
  PromotiontypeRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Promotiontype, dataSource);
  }
}

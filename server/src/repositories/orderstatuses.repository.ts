import {DefaultCrudRepository} from '@loopback/repository';
import {Orderstatuses, OrderstatusesRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderstatusesRepository extends DefaultCrudRepository<
  Orderstatuses,
  typeof Orderstatuses.prototype.id,
  OrderstatusesRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Orderstatuses, dataSource);
  }
}

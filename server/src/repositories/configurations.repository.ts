import {DefaultCrudRepository} from '@loopback/repository';
import {Configurations, ConfigurationsRelations} from '../models';
import {KilloDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConfigurationsRepository extends DefaultCrudRepository<
  Configurations,
  typeof Configurations.prototype.id,
  ConfigurationsRelations
> {
  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource,
  ) {
    super(Configurations, dataSource);
  }
}

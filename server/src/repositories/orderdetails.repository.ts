import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Orderdetails, OrderdetailsRelations, Units} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UnitsRepository} from './units.repository';

export class OrderdetailsRepository extends DefaultCrudRepository<
  Orderdetails,
  typeof Orderdetails.prototype.id,
  OrderdetailsRelations
> {

  public readonly units: BelongsToAccessor<Units, typeof Orderdetails.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('UnitsRepository') protected unitsRepositoryGetter: Getter<UnitsRepository>,
  ) {
    super(Orderdetails, dataSource);
    this.units = this.createBelongsToAccessorFor('retailPriceUnits', unitsRepositoryGetter,);
    this.registerInclusionResolver('units', this.units.inclusionResolver);
  }
}

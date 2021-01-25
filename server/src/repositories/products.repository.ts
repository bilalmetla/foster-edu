import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Products, ProductsRelations, Units, Producttypes} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UnitsRepository} from './units.repository';
import {ProducttypesRepository} from './producttypes.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly units: BelongsToAccessor<Units, typeof Products.prototype.id>;

  public readonly producttypes: BelongsToAccessor<Producttypes, typeof Products.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('UnitsRepository') protected unitsRepositoryGetter: Getter<UnitsRepository>, @repository.getter('ProducttypesRepository') protected producttypesRepositoryGetter: Getter<ProducttypesRepository>,
  ) {
    super(Products, dataSource);
    this.producttypes = this.createBelongsToAccessorFor('producttypes', producttypesRepositoryGetter,);
    this.registerInclusionResolver('producttypes', this.producttypes.inclusionResolver);
    this.units = this.createBelongsToAccessorFor('buyingPriceUnits', unitsRepositoryGetter,);
    this.registerInclusionResolver('units', this.units.inclusionResolver);
  }
}

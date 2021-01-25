import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Stock, StockRelations, Products, Units} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductsRepository} from './products.repository';
import {UnitsRepository} from './units.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.id,
  StockRelations
> {

  public readonly products: BelongsToAccessor<Products, typeof Stock.prototype.id>;

  public readonly units: BelongsToAccessor<Units, typeof Stock.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('UnitsRepository') protected unitsRepositoryGetter: Getter<UnitsRepository>,
  ) {
    super(Stock, dataSource);
    this.units = this.createBelongsToAccessorFor('units', unitsRepositoryGetter,);
    this.registerInclusionResolver('units', this.units.inclusionResolver);
    this.products = this.createBelongsToAccessorFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}

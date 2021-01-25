import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Supply, SupplyRelations, Partners, Products, Units} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PartnersRepository} from './partners.repository';
import {ProductsRepository} from './products.repository';
import {UnitsRepository} from './units.repository';

export class SupplyRepository extends DefaultCrudRepository<
  Supply,
  typeof Supply.prototype.id,
  SupplyRelations
> {

  public readonly partners: BelongsToAccessor<Partners, typeof Supply.prototype.id>;

  public readonly products: BelongsToAccessor<Products, typeof Supply.prototype.id>;

  public readonly units: BelongsToAccessor<Units, typeof Supply.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('PartnersRepository') protected partnersRepositoryGetter: Getter<PartnersRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('UnitsRepository') protected unitsRepositoryGetter: Getter<UnitsRepository>,
  ) {
    super(Supply, dataSource);
    this.units = this.createBelongsToAccessorFor('buyingPriceUnit', unitsRepositoryGetter,);
    this.registerInclusionResolver('units', this.units.inclusionResolver);
    this.products = this.createBelongsToAccessorFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.partners = this.createBelongsToAccessorFor('supplier', partnersRepositoryGetter,);
    this.registerInclusionResolver('partners', this.partners.inclusionResolver);
  }
}

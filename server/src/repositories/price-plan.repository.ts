import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PricePlan, PricePlanRelations, PricePlanTypes} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PricePlanTypesRepository} from './price-plan-types.repository';

export class PricePlanRepository extends DefaultCrudRepository<
  PricePlan,
  typeof PricePlan.prototype.id,
  PricePlanRelations
> {

  public readonly pricePlanTypes: BelongsToAccessor<PricePlanTypes, typeof PricePlan.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('PricePlanTypesRepository') protected pricePlanTypesRepositoryGetter: Getter<PricePlanTypesRepository>,
  ) {
    super(PricePlan, dataSource);
    this.pricePlanTypes = this.createBelongsToAccessorFor('pricePlanTypes', pricePlanTypesRepositoryGetter,);
    this.registerInclusionResolver('pricePlanTypes', this.pricePlanTypes.inclusionResolver);
  }
}

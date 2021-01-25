import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Promotion, PromotionRelations, Promotiontype} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PromotiontypeRepository} from './promotiontype.repository';

export class PromotionRepository extends DefaultCrudRepository<
  Promotion,
  typeof Promotion.prototype.id,
  PromotionRelations
> {

  public readonly promotiontype: BelongsToAccessor<Promotiontype, typeof Promotion.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('PromotiontypeRepository') protected promotiontypeRepositoryGetter: Getter<PromotiontypeRepository>,
  ) {
    super(Promotion, dataSource);
    this.promotiontype = this.createBelongsToAccessorFor('promotiontype', promotiontypeRepositoryGetter,);
    this.registerInclusionResolver('promotiontype', this.promotiontype.inclusionResolver);
  }
}

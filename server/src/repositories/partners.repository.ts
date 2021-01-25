import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Partners, PartnersRelations, Partnertypes, Orders} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PartnertypesRepository} from './partnertypes.repository';
import {OrdersRepository} from './orders.repository';

export class PartnersRepository extends DefaultCrudRepository<
  Partners,
  typeof Partners.prototype.id,
  PartnersRelations
> {

  public readonly partnertypes: BelongsToAccessor<Partnertypes, typeof Partners.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Partners.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('PartnertypesRepository') protected partnertypesRepositoryGetter: Getter<PartnertypesRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Partners, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.partnertypes = this.createBelongsToAccessorFor('partnertypes', partnertypesRepositoryGetter,);
    this.registerInclusionResolver('partnertypes', this.partnertypes.inclusionResolver);
  }
}

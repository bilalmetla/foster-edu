import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OrderRatings, OrderRatingsRelations, RatingReasons, Orders, Customers} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RatingReasonsRepository} from './rating-reasons.repository';
import {OrdersRepository} from './orders.repository';
import {CustomersRepository} from './customers.repository';

export class OrderRatingsRepository extends DefaultCrudRepository<
  OrderRatings,
  typeof OrderRatings.prototype.id,
  OrderRatingsRelations
> {

  public readonly ratingReasons: BelongsToAccessor<RatingReasons, typeof OrderRatings.prototype.id>;

  public readonly orders: BelongsToAccessor<Orders, typeof OrderRatings.prototype.id>;

  public readonly customers: BelongsToAccessor<Customers, typeof OrderRatings.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('RatingReasonsRepository') protected ratingReasonsRepositoryGetter: Getter<RatingReasonsRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(OrderRatings, dataSource);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.ratingReasons = this.createBelongsToAccessorFor('ratingReasons', ratingReasonsRepositoryGetter,);
    this.registerInclusionResolver('ratingReasons', this.ratingReasons.inclusionResolver);
  }
}

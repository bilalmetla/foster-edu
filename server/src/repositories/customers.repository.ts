import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Customers, CustomersRelations, Orders} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Customers, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}

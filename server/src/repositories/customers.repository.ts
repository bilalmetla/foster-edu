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

  //public readonly studyRequests: HasManyRepositoryFactory<StudyRequests, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, 
  ) {
    super(Customers, dataSource);
   // this.studyRequests = this.createHasManyRepositoryFactoryFor('studyRequests', studyRequestsRepositoryGetter,);
   // this.registerInclusionResolver('studyRequests', this.studyRequests.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}

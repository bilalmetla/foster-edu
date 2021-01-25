import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Orders, OrdersRelations, Orderstatuses, Orderdetails, Partners, User, Customers} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderstatusesRepository} from './orderstatuses.repository';
import {OrderdetailsRepository} from './orderdetails.repository';
import {PartnersRepository} from './partners.repository';
import { UserRepository } from './user.repository';
import { CustomersRepository } from './customers.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {

  public readonly orderstatuses: BelongsToAccessor<Orderstatuses, typeof Orders.prototype.id>;

  public readonly orderdetails: HasManyRepositoryFactory<Orderdetails, typeof Orders.prototype.id>;

  public readonly partners: BelongsToAccessor<Partners, typeof Orders.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Orders.prototype.id>;

  public readonly customers: BelongsToAccessor<Customers, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('OrderstatusesRepository') protected orderstatusesRepositoryGetter: Getter<OrderstatusesRepository>, @repository.getter('OrderdetailsRepository') protected orderdetailsRepositoryGetter: Getter<OrderdetailsRepository>, @repository.getter('PartnersRepository') protected partnersRepositoryGetter: Getter<PartnersRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,  @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(Orders, dataSource);
    
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    
    this.user = this.createBelongsToAccessorFor('deletedBy', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);

    this.user = this.createBelongsToAccessorFor('canceledByAdmin', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
   
    this.partners = this.createBelongsToAccessorFor('deliveredBy', partnersRepositoryGetter,);
    this.registerInclusionResolver('partners', this.partners.inclusionResolver);
    
    this.orderdetails = this.createHasManyRepositoryFactoryFor('orderdetails', orderdetailsRepositoryGetter,);
    this.registerInclusionResolver('orderdetails', this.orderdetails.inclusionResolver);
    this.orderstatuses = this.createBelongsToAccessorFor('orderstatuses', orderstatusesRepositoryGetter,);
    this.registerInclusionResolver('orderstatuses', this.orderstatuses.inclusionResolver);

  }
}

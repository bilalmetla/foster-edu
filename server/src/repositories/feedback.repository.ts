import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Feedback, FeedbackRelations, Customers, Feedbacktypes, Partners} from '../models';
import {KilloDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomersRepository} from './customers.repository';
import {FeedbacktypesRepository} from './feedbacktypes.repository';
import {PartnersRepository} from './partners.repository';

export class FeedbackRepository extends DefaultCrudRepository<
  Feedback,
  typeof Feedback.prototype.id,
  FeedbackRelations
> {

  public readonly customers: BelongsToAccessor<Customers, typeof Feedback.prototype.id>;

  public readonly feedbacktypes: BelongsToAccessor<Feedbacktypes, typeof Feedback.prototype.id>;

  public readonly partners: BelongsToAccessor<Partners, typeof Feedback.prototype.id>;

  constructor(
    @inject('datasources.killo') dataSource: KilloDataSource, @repository.getter('FeedbacktypesRepository') protected feedbacktypesRepositoryGetter: Getter<FeedbacktypesRepository>, 
  ) {
    super(Feedback, dataSource);
    //this.partners = this.createBelongsToAccessorFor('partners', partnersRepositoryGetter,);
   // this.registerInclusionResolver('partners', this.partners.inclusionResolver);
    this.feedbacktypes = this.createBelongsToAccessorFor('feedbacktypes', feedbacktypesRepositoryGetter,);
    this.registerInclusionResolver('feedbacktypes', this.feedbacktypes.inclusionResolver);
   // this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    //this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}

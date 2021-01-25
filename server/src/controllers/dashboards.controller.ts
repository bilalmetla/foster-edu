// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {CustomersRepository, FeedbackRepository, OrdersRepository} from '../repositories';
import {secured, SecuredType} from '../auth';




export class DashboardsController {
  constructor(
    @repository(CustomersRepository) public customersRepository: CustomersRepository,
    @repository(FeedbackRepository) public feedbackRepository: FeedbackRepository,
    @repository(OrdersRepository) public ordersRepository: OrdersRepository,

  ) {}

 @secured(SecuredType.IS_AUTHENTICATED)
  @get('/dashboards/stats', {
    responses: {
      '200': {
        description: 'Dashboard Stats calculating.',
        
      },
    },
  })
  async getStats(
    
  ): Promise<any> {
    const users = await this.customersRepository.count();
    const feedbacks = await this.feedbackRepository.count();
    const orders = await this.ordersRepository.count();
    const ordersPending = await this.ordersRepository.count({orderStatus: 'Pending'});
    const ordersCompleted = await this.ordersRepository.count({orderStatus: 'Completed'});
    const ordersCancelled = await this.ordersRepository.count({orderStatus: 'Cancelled'});
    return {users, feedbacks, orders, ordersPending, ordersCompleted, ordersCancelled};
  }


  
}




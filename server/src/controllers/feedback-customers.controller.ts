import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Feedback,
  Customers,
} from '../models';
import {FeedbackRepository} from '../repositories';
import {secured, SecuredType} from '../auth';



export class FeedbackCustomersController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository: FeedbackRepository,
  ) { }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/feedbacks/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Feedback',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.string('id') id: typeof Feedback.prototype.id,
  ): Promise<Customers> {
    return this.feedbackRepository.customers(id);
  }
}

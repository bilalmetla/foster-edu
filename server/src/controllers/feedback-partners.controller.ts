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
  Partners,
} from '../models';
import {FeedbackRepository} from '../repositories';

export class FeedbackPartnersController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository: FeedbackRepository,
  ) { }

  @get('/feedbacks/{id}/partners', {
    responses: {
      '200': {
        description: 'Partners belonging to Feedback',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partners)},
          },
        },
      },
    },
  })
  async getPartners(
    @param.path.string('id') id: typeof Feedback.prototype.id,
  ): Promise<Partners> {
    return this.feedbackRepository.partners(id);
  }
}

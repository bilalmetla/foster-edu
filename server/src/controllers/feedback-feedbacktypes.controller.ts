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
  Feedbacktypes,
} from '../models';
import {FeedbackRepository} from '../repositories';

export class FeedbackFeedbacktypesController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository: FeedbackRepository,
  ) { }

  @get('/feedbacks/{id}/feedbacktypes', {
    responses: {
      '200': {
        description: 'Feedbacktypes belonging to Feedback',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Feedbacktypes)},
          },
        },
      },
    },
  })
  async getFeedbacktypes(
    @param.path.string('id') id: typeof Feedback.prototype.id,
  ): Promise<Feedbacktypes> {
    return this.feedbackRepository.feedbacktypes(id);
  }
}

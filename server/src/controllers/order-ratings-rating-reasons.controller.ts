import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderRatings,
  RatingReasons,
} from '../models';
import {OrderRatingsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';



export class OrderRatingsRatingReasonsController {
  constructor(
    @repository(OrderRatingsRepository)
    public orderRatingsRepository: OrderRatingsRepository,
  ) { }


  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/order-ratings/{id}/rating-reasons', {
    responses: {
      '200': {
        description: 'RatingReasons belonging to OrderRatings',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RatingReasons)},
          },
        },
      },
    },
  })
  async getRatingReasons(
    @param.path.string('id') id: typeof OrderRatings.prototype.id,
  ): Promise<RatingReasons> {
    return this.orderRatingsRepository.ratingReasons(id);
  }
}

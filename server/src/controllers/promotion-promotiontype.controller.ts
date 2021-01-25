import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Promotion,
  Promotiontype,
} from '../models';
import {PromotionRepository} from '../repositories';

export class PromotionPromotiontypeController {
  constructor(
    @repository(PromotionRepository)
    public promotionRepository: PromotionRepository,
  ) { }

  @get('/promotions/{id}/promotiontype', {
    responses: {
      '200': {
        description: 'Promotiontype belonging to Promotion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Promotiontype)},
          },
        },
      },
    },
  })
  async getPromotiontype(
    @param.path.string('id') id: typeof Promotion.prototype.id,
  ): Promise<Promotiontype> {
    return this.promotionRepository.promotiontype(id);
  }
}

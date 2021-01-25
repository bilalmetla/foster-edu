import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PricePlan,
  PricePlanTypes,
} from '../models';
import {PricePlanRepository} from '../repositories';

export class PricePlanPricePlanTypesController {
  constructor(
    @repository(PricePlanRepository)
    public pricePlanRepository: PricePlanRepository,
  ) { }

  @get('/price-plans/{id}/price-plan-types', {
    responses: {
      '200': {
        description: 'PricePlanTypes belonging to PricePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PricePlanTypes)},
          },
        },
      },
    },
  })
  async getPricePlanTypes(
    @param.path.string('id') id: typeof PricePlan.prototype.id,
  ): Promise<PricePlanTypes> {
    return this.pricePlanRepository.pricePlanTypes(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Supply,
  Partners,
} from '../models';
import {SupplyRepository} from '../repositories';

export class SupplyPartnersController {
  constructor(
    @repository(SupplyRepository)
    public supplyRepository: SupplyRepository,
  ) { }

  @get('/supplies/{id}/partners', {
    responses: {
      '200': {
        description: 'Partners belonging to Supply',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partners)},
          },
        },
      },
    },
  })
  async getPartners(
    @param.path.string('id') id: typeof Supply.prototype.id,
  ): Promise<Partners> {
    return this.supplyRepository.partners(id);
  }
}

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
  Units,
} from '../models';
import {SupplyRepository} from '../repositories';

export class SupplyUnitsController {
  constructor(
    @repository(SupplyRepository)
    public supplyRepository: SupplyRepository,
  ) { }

  @get('/supplies/{id}/units', {
    responses: {
      '200': {
        description: 'Units belonging to Supply',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Units)},
          },
        },
      },
    },
  })
  async getUnits(
    @param.path.string('id') id: typeof Supply.prototype.id,
  ): Promise<Units> {
    return this.supplyRepository.units(id);
  }
}

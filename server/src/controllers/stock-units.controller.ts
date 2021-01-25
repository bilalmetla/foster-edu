import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stock,
  Units,
} from '../models';
import {StockRepository} from '../repositories';

export class StockUnitsController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/units', {
    responses: {
      '200': {
        description: 'Units belonging to Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Units)},
          },
        },
      },
    },
  })
  async getUnits(
    @param.path.string('id') id: typeof Stock.prototype.id,
  ): Promise<Units> {
    return this.stockRepository.units(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orderdetails,
  Units,
} from '../models';
import {OrderdetailsRepository} from '../repositories';

export class OrderdetailsUnitsController {
  constructor(
    @repository(OrderdetailsRepository)
    public orderdetailsRepository: OrderdetailsRepository,
  ) { }

  @get('/orderdetails/{id}/units', {
    responses: {
      '200': {
        description: 'Units belonging to Orderdetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Units)},
          },
        },
      },
    },
  })
  async getUnits(
    @param.path.string('id') id: typeof Orderdetails.prototype.id,
  ): Promise<Units> {
    return this.orderdetailsRepository.units(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Products,
  Units,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsUnitsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/units', {
    responses: {
      '200': {
        description: 'Units belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Units)},
          },
        },
      },
    },
  })
  async getUnits(
    @param.path.string('id') id: typeof Products.prototype.id,
  ): Promise<Units> {
    return this.productsRepository.units(id);
  }
}

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
  Producttypes,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsProducttypesController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/producttypes', {
    responses: {
      '200': {
        description: 'Producttypes belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producttypes)},
          },
        },
      },
    },
  })
  async getProducttypes(
    @param.path.string('id') id: typeof Products.prototype.id,
  ): Promise<Producttypes> {
    return this.productsRepository.producttypes(id);
  }
}

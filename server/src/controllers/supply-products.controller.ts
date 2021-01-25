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
  Products,
} from '../models';
import {SupplyRepository} from '../repositories';

export class SupplyProductsController {
  constructor(
    @repository(SupplyRepository)
    public supplyRepository: SupplyRepository,
  ) { }

  @get('/supplies/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to Supply',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.string('id') id: typeof Supply.prototype.id,
  ): Promise<Products> {
    return this.supplyRepository.products(id);
  }
}

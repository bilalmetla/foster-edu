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
  Products,
} from '../models';
import {StockRepository} from '../repositories';

export class StockProductsController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.string('id') id: typeof Stock.prototype.id,
  ): Promise<Products> {
    return this.stockRepository.products(id);
  }
}

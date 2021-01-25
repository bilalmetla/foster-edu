import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Supply} from '../models';
import {SupplyRepository, ProductsRepository} from '../repositories';
import { CONSTANTS } from '../constants';
import {secured, SecuredType} from '../auth';
import { winstonLogger as logger } from "../logger";

export class SupplyController {
  constructor(
    @repository(SupplyRepository)
    public supplyRepository : SupplyRepository,

    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,

  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/supplies', {
    responses: {
      '200': {
        description: 'Supply model instance',
        content: {'application/json': {schema: getModelSchemaRef(Supply)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supply, {
            title: 'NewSupply',
            exclude: ['id'],
          }),
        },
      },
    })
    supply: Omit<Supply, 'id'>,
  ): Promise<Supply> {
    supply.supplyDate = new Date();
    return this.supplyRepository.create(supply);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/supplies/count', {
    responses: {
      '200': {
        description: 'Supply model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Supply)) where?: Where<Supply>,
  ): Promise<Count> {
    return this.supplyRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/supplies', {
    responses: {
      '200': {
        description: 'Array of Supply model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Supply, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Supply)) filter?: Filter<Supply>,
  ): Promise<Supply[]> {
    return this.supplyRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/supplies', {
    responses: {
      '200': {
        description: 'Supply PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supply, {partial: true}),
        },
      },
    })
    supply: Supply,
    @param.query.object('where', getWhereSchemaFor(Supply)) where?: Where<Supply>,
  ): Promise<Count> {
    supply.isArrived = false;
    return this.supplyRepository.updateAll(supply, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/supplies/{id}', {
    responses: {
      '200': {
        description: 'Supply model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Supply, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Supply)) filter?: Filter<Supply>
  ): Promise<Supply> {
    return this.supplyRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/supplies/{id}', {
    responses: {
      '204': {
        description: 'Supply PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Supply, {partial: true}),
        },
      },
    })
    supply: Supply,
  ): Promise<void> {
    supply.isArrived = false;
    await this.supplyRepository.updateById(id, supply);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/supplies/{id}', {
    responses: {
      '204': {
        description: 'Supply PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() supply: Supply,
  ): Promise<void> {
    await this.supplyRepository.replaceById(id, supply);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/supplies/{id}', {
    responses: {
      '204': {
        description: 'Supply DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.supplyRepository.deleteById(id);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/supplies/{id}/arrived', {
    responses: {
      '204': {
        description: 'Supply Arrived success',
      },
    },
  })
  async supplyArrived(@param.path.string('id') id: string): Promise<object> {

    let supply = await this.supplyRepository.findOne({ "where": { id } });
    if (supply) {
        
        supply.arrivedAt = new Date();
        supply.isArrived = true;
        let productId = supply.productsId;
        await this.supplyRepository.updateById(id, supply);
        logger.debug("productId: ", productId);
        let product = await this.productsRepository.findById(productId);
        if (product) {
            product.quentityOnHand = product.quentityOnHand ?  product.quentityOnHand + supply.quentity : supply.quentity;
            product.buyingPrice = supply.purchasingCost;
            product.buyingPriceUnitsId = supply.buyingPriceUnitId;
            await this.productsRepository.updateById(productId, product);
            
            return {id, isArrived: supply.isArrived }
        }
        else {
           // throw new rest_1.HttpErrors.UnprocessableEntity('Product Not Found!');
           return CONSTANTS.PRODUCT_NOT_FOUND;
        }
    }
    else {
        //throw new rest_1.HttpErrors.UnprocessableEntity('Supply Not Found!');
        return CONSTANTS.NO_SUPPLY_EXISTS;
    }
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @get('/supplies/demand/{startDate}/{endDate}', {
    responses: {
      '204': {
        description: 'Supply Demand success',
      },
    },
  })
  async supplyDemand(
    @param.path.string('startDate') startDate: string,
    @param.path.string('endDate') endDate: string
  ): Promise<object> {
    var fromday = new Date(startDate);
    var tillday = new Date(endDate);
    fromday.setDate(fromday.getDate() - 1);
    let filter = {
      "where": { supplyDate:{gte: fromday, lt: tillday} },
      "fields": {         
            productsId: true,
            "productTitle": true,
            "quentity": true,
            quentityUnitsId: true
        }
    }
    
    return await this.supplyRepository.find(filter);

  }




}

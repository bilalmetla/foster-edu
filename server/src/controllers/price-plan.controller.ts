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
import {PricePlan, Products} from '../models';
import {PricePlanRepository, ProductsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';
import {CONSTANTS} from '../constants'
import { winstonLogger as logger } from "../logger";


export class PricePlanController {
  constructor(
    @repository(PricePlanRepository)
    public pricePlanRepository : PricePlanRepository,
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/price-plans', {
    responses: {
      '200': {
        description: 'PricePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PricePlan)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlan, {
            title: 'NewPricePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    pricePlan: Omit<PricePlan, 'id'>,
  ): Promise<PricePlan> {
    return this.pricePlanRepository.create(pricePlan);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/price-plans/count', {
    responses: {
      '200': {
        description: 'PricePlan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PricePlan)) where?: Where<PricePlan>,
  ): Promise<Count> {
    return this.pricePlanRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/price-plans', {
    responses: {
      '200': {
        description: 'Array of PricePlan model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PricePlan, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PricePlan)) filter?: Filter<PricePlan>,
  ): Promise<PricePlan[]> {
    return this.pricePlanRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/price-plans', {
    responses: {
      '200': {
        description: 'PricePlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlan, {partial: true}),
        },
      },
    })
    pricePlan: PricePlan,
    @param.query.object('where', getWhereSchemaFor(PricePlan)) where?: Where<PricePlan>,
  ): Promise<Count> {
    return this.pricePlanRepository.updateAll(pricePlan, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/price-plans/{id}', {
    responses: {
      '200': {
        description: 'PricePlan model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PricePlan, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PricePlan)) filter?: Filter<PricePlan>
  ): Promise<PricePlan> {
    
    return this.pricePlanRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/price-plans/{id}', {
    responses: {
      '204': {
        description: 'PricePlan PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlan, {partial: true}),
        },
      },
    })
    pricePlan: PricePlan,
  ): Promise<void> {
    await this.pricePlanRepository.updateById(id, pricePlan);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/price-plans/{id}', {
    responses: {
      '204': {
        description: 'PricePlan PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pricePlan: PricePlan,
  ): Promise<void> {
    await this.pricePlanRepository.replaceById(id, pricePlan);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/price-plans/{id}', {
    responses: {
      '204': {
        description: 'PricePlan DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pricePlanRepository.deleteById(id);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/price-plans/{id}/apply', {
    responses: {
      '204': {
        description: 'PricePlan applied success',
      },
    },
  })
  async applyPricePlan(@param.path.string('id') id: string): Promise<Omit<PricePlan, 'id'>> {
    
    const rateplan = await this.pricePlanRepository.findById(id);
    if(!rateplan){
      return CONSTANTS.PRICEPLAN_NOT_FOUND 
    }
    const session = (this.productsRepository.dataSource.connector as any).client.startSession();
    session.startTransaction();
    
    let markUpPercentage = rateplan.chargeValue;
    //CONSIDERING 2 IS FOR FIXED RATE.
    if(rateplan.pricePlanTypesId && rateplan.pricePlanTypesId == '2'){
      markUpPercentage = rateplan.chargeValue;
    }

    const allproducts = await this.productsRepository.find( {
      // fields: {
      //   id: true,
      //   totalCost: true,
      //   retailPrice: true,
      //   } 
  } )

  logger.debug('all products', JSON.stringify(allproducts) )
    
    for( let p of allproducts ){
      p.retailPrice = Math.round( ((p.totalCost || 0) / (100-markUpPercentage) * 100 ) );
      const p_updated = await this.productsRepository.updateAll(p, undefined, {session});
      logger.debug('price paln updatedProducts', JSON.stringify(p_updated))
       if(!p_updated.count){
          await session.abortTransaction();
          session.endSession();
          return CONSTANTS.PRODUCT_NOT_UPDATED 
        }
    }

    rateplan.isApplied = true;
    let updatedPricePlan = await this.pricePlanRepository.updateAll(rateplan,undefined, {session});
    logger.debug('price paln updatedPricePlan', JSON.stringify(updatedPricePlan))
    const se_resp = await session.commitTransaction();
    session.endSession();
    logger.debug(`session response ${se_resp}`);
    return {id}
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/price-plans/{id}/stop', {
    responses: {
      '204': {
        description: 'PricePlan stoped success',
      },
    },
  })
  async stopPricePlan(@param.path.string('id') id: string): Promise<Omit<PricePlan, 'id'> > {

    const session = (this.productsRepository.dataSource.connector as any).client.startSession();
    session.startTransaction();
    
    const allproducts = await this.productsRepository.find( {
      // fields: {
      //   id: true,
      //   totalCost: true,
      //   retailPrice: true,
      //   } 
  } )

  logger.debug('all products', JSON.stringify(allproducts) )
    
    for( let p of allproducts ){
      p.retailPrice = 0;
      const p_updated = await this.productsRepository.updateAll(p, undefined, {session});
      logger.debug('price paln updatedProducts', JSON.stringify(p_updated))
       if(!p_updated.count){
          await session.abortTransaction();
          session.endSession();
          return CONSTANTS.PRODUCT_NOT_UPDATED //todo 
        }
    }

    await this.pricePlanRepository.updateById(id, {isApplied: false});
    await session.commitTransaction();
    session.endSession();
    return {id}
  }

}

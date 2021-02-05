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
import {Promotion} from '../models';
import {PromotionRepository, ProductsRepository} from '../repositories';
import fs from 'fs';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)
import path from 'path';
import {secured, SecuredType} from '../auth';
import {CONSTANTS} from '../constants'
import { winstonLogger as logger } from "../logger";


export class PromotionController {
  constructor(
    @repository(PromotionRepository)
    public promotionRepository : PromotionRepository,
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,

  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/promotions', {
    responses: {
      '200': {
        description: 'Promotion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Promotion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion, {
            title: 'NewPromotion',
            exclude: ['id'],
          }),
        },
      },
    })
    promotion: Omit<Promotion, 'id'>,
  ): Promise<Promotion> {
    promotion.imageUrl = await this.convertbase64image(promotion.title, promotion.image);
    //delete promotion.image;
    return this.promotionRepository.create(promotion);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/promotions/count', {
    responses: {
      '200': {
        description: 'Promotion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Promotion)) where?: Where<Promotion>,
  ): Promise<Count> {
    return this.promotionRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/promotions', {
    responses: {
      '200': {
        description: 'Array of Promotion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Promotion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Promotion)) filter?: Filter<Promotion>,
  ): Promise<Promotion[]> {

    if(filter){
      filter.order = ['createdDate Desc']
    }else{
      filter = {};
      filter.order = ['createdDate Desc']
    }
    return this.promotionRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/promotions', {
    responses: {
      '200': {
        description: 'Promotion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion, {partial: true}),
        },
      },
    })
    promotion: Promotion,
    @param.query.object('where', getWhereSchemaFor(Promotion)) where?: Where<Promotion>,
  ): Promise<Count> {
    return this.promotionRepository.updateAll(promotion, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/promotions/{id}', {
    responses: {
      '200': {
        description: 'Promotion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Promotion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Promotion)) filter?: Filter<Promotion>
  ): Promise<Promotion> {
    return this.promotionRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion, {partial: true}),
        },
      },
    })
    promotion: Promotion,
  ): Promise<void> {
    await this.promotionRepository.updateById(id, promotion);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() promotion: Promotion,
  ): Promise<void> {
   
   if(promotion.image){
     promotion.imageUrl = await this.convertbase64image(promotion.title, promotion.image);
    }
    //delete promotion.image;
    await this.promotionRepository.replaceById(id, promotion);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.promotionRepository.deleteById(id);
  }

  async convertbase64image(imagename: string, image: string) : Promise<string>{
    let base64String = image;
    let base64Image = base64String.split(';base64,').pop();
    imagename = imagename.replace(/ /g, '_')+'.png'
    let imagePath =  path.join(__dirname, '../../public/promotions/images/')+imagename;
    let imageUrl = '/promotions/images/'+imagename;
    await writeFilePromise(imagePath, base64Image,  {encoding: 'base64'});
    return imageUrl;
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/promotions/{id}/apply', {
    responses: {
      '204': {
        description: 'promotions applied success',
      },
    },
  })
  async applyPromotions(@param.path.string('id') id: string): Promise<Omit<Promotion, 'id'>> {
    
    const promo = await this.promotionRepository.findById(id);
    if(!promo){
      return CONSTANTS.PEOMOTION_NOT_FOUND 
    }
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
      p.salePrice = Math.round(promo.isPromotionValueFixed? p.retailPrice?((p.retailPrice/100)*promo.promotionValue):0  : p.retailPrice?p.retailPrice-promo.promotionValue:0 )
      const p_updated = await this.productsRepository.updateAll(p, undefined, {session});
      logger.debug('promotion updatedProducts', JSON.stringify(p_updated))
       if(!p_updated.count){
          await session.abortTransaction();
          session.endSession();
          return CONSTANTS.PRODUCT_NOT_UPDATED 
        }
    }

    promo.isActive = true;
    let updatedPricePlan = await this.promotionRepository.updateAll(promo, undefined, {session});
    logger.debug('price paln updatedPricePlan', JSON.stringify(updatedPricePlan))
    const se_resp = await session.commitTransaction();
    session.endSession();
    logger.debug(`session response ${se_resp}`);
    return {id}
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/promotions/{id}/stop', {
    responses: {
      '204': {
        description: 'promotions stoped success',
      },
    },
  })
  async stoppromotions(@param.path.string('id') id: string): Promise<Omit<Promotion, 'id'> > {

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
      p.salePrice = 0;
      const p_updated = await this.productsRepository.updateAll(p, undefined, {session});
      logger.debug('promotion updatedProducts', JSON.stringify(p_updated))
       if(!p_updated.count){
          await session.abortTransaction();
          session.endSession();
          return CONSTANTS.PRODUCT_NOT_UPDATED //todo 
        }
    }

    await this.promotionRepository.updateById(id, {isActive: false});
    await session.commitTransaction();
    session.endSession();
    return {id}
  }


}

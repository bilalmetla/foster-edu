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
import {Products} from '../models';
import {ProductsRepository} from '../repositories';
import fs from 'fs';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)
import path from 'path';
import { MethodDecoratorFactory } from '@loopback/core';
import {secured, SecuredType} from '../auth';


export class ProductsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/products', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProducts',
            exclude: ['id'],
          }),
        },
      },
    })
    products: Omit<Products, 'id'>,
  ): Promise<Products> {
    
    products.imageUrl = await this.convertbase64image(products.displayName, products.image);
    delete products.image;
    return this.productsRepository.create(products);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/products/count', {
    responses: {
      '200': {
        description: 'Products model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.productsRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Products model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Products, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Products)) filter?: Filter<Products>,
  ): Promise<Products[]> {

    if(filter){
      filter.order = ['displayingPeriority Asc']
    }else{
      filter = {};
      filter.order = ['displayingPeriority Asc']
    }
    // filter.where = {customersId:id};
    // filter.include = [{"relation": 'partners', 
    // scope: {fields :{"id": true, "name": true,"phone": true,"location": true,} } }
    // ];

    return this.productsRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/products', {
    responses: {
      '200': {
        description: 'Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.productsRepository.updateAll(products, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Products, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Products)) filter?: Filter<Products>
  ): Promise<Products> {
    return this.productsRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/products/{id}', {
    responses: {
      '204': {
        description: 'Products PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
  ): Promise<void> {
    await this.productsRepository.updateById(id, products);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/products/{id}', {
    responses: {
      '204': {
        description: 'Products PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() products: Products,
  ): Promise<void> {
    if(products.image){
      products.imageUrl = await this.convertbase64image(products.displayName, products.image);
    }
    
    delete products.image;
    await this.productsRepository.replaceById(id, products);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/products/{id}', {
    responses: {
      '204': {
        description: 'Products DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productsRepository.deleteById(id);
  }

 @secured(SecuredType.IS_AUTHENTICATED)
  @get('/products/types/{producttypesId}', {
    responses: {
      '200': {
        description: 'Array of Products model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Products, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findByProductTypeId(
    @param.path.string('producttypesId') producttypesId: string,
  ): Promise<Products[]> {
   
  //   let filter = {
  //     "where": { producttypesId },
  //     "fields": {}
  // };
    const filter: Filter<Products> = {};
    filter.where = {and:[{producttypesId}, {isAvailable: true}]};
    filter.order = ['displayingPeriority Asc'] 

    return this.productsRepository.find(filter);

  }

  
  async convertbase64image(imagename: string, image: string) : Promise<string>{
    let base64String = image;
    let base64Image = base64String.split(';base64,').pop();
    imagename = imagename.replace(/ /g, '')+'.png'
    let imagePath =  path.join(__dirname, '../../public/products/images/')+imagename;
    let imageUrl = '/products/images/'+imagename;
    await writeFilePromise(imagePath, base64Image,  {encoding: 'base64'});
    return imageUrl;
  }


}

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
import {Producttypes} from '../models';
import {ProducttypesRepository} from '../repositories';

export class ProducttypesController {
  constructor(
    @repository(ProducttypesRepository)
    public producttypesRepository : ProducttypesRepository,
  ) {}

  @post('/producttypes', {
    responses: {
      '200': {
        description: 'Producttypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producttypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producttypes, {
            title: 'NewProducttypes',
            exclude: ['id'],
          }),
        },
      },
    })
    producttypes: Omit<Producttypes, 'id'>,
  ): Promise<Producttypes> {
    return this.producttypesRepository.create(producttypes);
  }

  @get('/producttypes/count', {
    responses: {
      '200': {
        description: 'Producttypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Producttypes)) where?: Where<Producttypes>,
  ): Promise<Count> {
    return this.producttypesRepository.count(where);
  }

  @get('/producttypes', {
    responses: {
      '200': {
        description: 'Array of Producttypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Producttypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Producttypes)) filter?: Filter<Producttypes>,
  ): Promise<Producttypes[]> {
    return this.producttypesRepository.find(filter);
  }

  @patch('/producttypes', {
    responses: {
      '200': {
        description: 'Producttypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producttypes, {partial: true}),
        },
      },
    })
    producttypes: Producttypes,
    @param.query.object('where', getWhereSchemaFor(Producttypes)) where?: Where<Producttypes>,
  ): Promise<Count> {
    return this.producttypesRepository.updateAll(producttypes, where);
  }

  @get('/producttypes/{id}', {
    responses: {
      '200': {
        description: 'Producttypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producttypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Producttypes)) filter?: Filter<Producttypes>
  ): Promise<Producttypes> {
    return this.producttypesRepository.findById(id, filter);
  }

  @patch('/producttypes/{id}', {
    responses: {
      '204': {
        description: 'Producttypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producttypes, {partial: true}),
        },
      },
    })
    producttypes: Producttypes,
  ): Promise<void> {
    await this.producttypesRepository.updateById(id, producttypes);
  }

  @put('/producttypes/{id}', {
    responses: {
      '204': {
        description: 'Producttypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() producttypes: Producttypes,
  ): Promise<void> {
    await this.producttypesRepository.replaceById(id, producttypes);
  }

  @del('/producttypes/{id}', {
    responses: {
      '204': {
        description: 'Producttypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.producttypesRepository.deleteById(id);
  }
}

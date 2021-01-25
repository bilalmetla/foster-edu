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
import {PricePlanTypes} from '../models';
import {PricePlanTypesRepository} from '../repositories';

export class PricePlanTypesController {
  constructor(
    @repository(PricePlanTypesRepository)
    public pricePlanTypesRepository : PricePlanTypesRepository,
  ) {}

  @post('/price-plan-types', {
    responses: {
      '200': {
        description: 'PricePlanTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(PricePlanTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlanTypes, {
            title: 'NewPricePlanTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    pricePlanTypes: Omit<PricePlanTypes, 'id'>,
  ): Promise<PricePlanTypes> {
    return this.pricePlanTypesRepository.create(pricePlanTypes);
  }

  @get('/price-plan-types/count', {
    responses: {
      '200': {
        description: 'PricePlanTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PricePlanTypes)) where?: Where<PricePlanTypes>,
  ): Promise<Count> {
    return this.pricePlanTypesRepository.count(where);
  }

  @get('/price-plan-types', {
    responses: {
      '200': {
        description: 'Array of PricePlanTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PricePlanTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PricePlanTypes)) filter?: Filter<PricePlanTypes>,
  ): Promise<PricePlanTypes[]> {
    return this.pricePlanTypesRepository.find(filter);
  }

  @patch('/price-plan-types', {
    responses: {
      '200': {
        description: 'PricePlanTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlanTypes, {partial: true}),
        },
      },
    })
    pricePlanTypes: PricePlanTypes,
    @param.query.object('where', getWhereSchemaFor(PricePlanTypes)) where?: Where<PricePlanTypes>,
  ): Promise<Count> {
    return this.pricePlanTypesRepository.updateAll(pricePlanTypes, where);
  }

  @get('/price-plan-types/{id}', {
    responses: {
      '200': {
        description: 'PricePlanTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PricePlanTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PricePlanTypes)) filter?: Filter<PricePlanTypes>
  ): Promise<PricePlanTypes> {
    return this.pricePlanTypesRepository.findById(id, filter);
  }

  @patch('/price-plan-types/{id}', {
    responses: {
      '204': {
        description: 'PricePlanTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PricePlanTypes, {partial: true}),
        },
      },
    })
    pricePlanTypes: PricePlanTypes,
  ): Promise<void> {
    await this.pricePlanTypesRepository.updateById(id, pricePlanTypes);
  }

  @put('/price-plan-types/{id}', {
    responses: {
      '204': {
        description: 'PricePlanTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pricePlanTypes: PricePlanTypes,
  ): Promise<void> {
    await this.pricePlanTypesRepository.replaceById(id, pricePlanTypes);
  }

  @del('/price-plan-types/{id}', {
    responses: {
      '204': {
        description: 'PricePlanTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pricePlanTypesRepository.deleteById(id);
  }
}

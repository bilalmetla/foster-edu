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
import {Promotiontype} from '../models';
import {PromotiontypeRepository} from '../repositories';

export class PromotiontypeController {
  constructor(
    @repository(PromotiontypeRepository)
    public promotiontypeRepository : PromotiontypeRepository,
  ) {}

  @post('/promotiontypes', {
    responses: {
      '200': {
        description: 'Promotiontype model instance',
        content: {'application/json': {schema: getModelSchemaRef(Promotiontype)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotiontype, {
            title: 'NewPromotiontype',
            exclude: ['id'],
          }),
        },
      },
    })
    promotiontype: Omit<Promotiontype, 'id'>,
  ): Promise<Promotiontype> {
    return this.promotiontypeRepository.create(promotiontype);
  }

  @get('/promotiontypes/count', {
    responses: {
      '200': {
        description: 'Promotiontype model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Promotiontype)) where?: Where<Promotiontype>,
  ): Promise<Count> {
    return this.promotiontypeRepository.count(where);
  }

  @get('/promotiontypes', {
    responses: {
      '200': {
        description: 'Array of Promotiontype model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Promotiontype, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Promotiontype)) filter?: Filter<Promotiontype>,
  ): Promise<Promotiontype[]> {
    return this.promotiontypeRepository.find(filter);
  }

  @patch('/promotiontypes', {
    responses: {
      '200': {
        description: 'Promotiontype PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotiontype, {partial: true}),
        },
      },
    })
    promotiontype: Promotiontype,
    @param.query.object('where', getWhereSchemaFor(Promotiontype)) where?: Where<Promotiontype>,
  ): Promise<Count> {
    return this.promotiontypeRepository.updateAll(promotiontype, where);
  }

  @get('/promotiontypes/{id}', {
    responses: {
      '200': {
        description: 'Promotiontype model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Promotiontype, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Promotiontype)) filter?: Filter<Promotiontype>
  ): Promise<Promotiontype> {
    return this.promotiontypeRepository.findById(id, filter);
  }

  @patch('/promotiontypes/{id}', {
    responses: {
      '204': {
        description: 'Promotiontype PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotiontype, {partial: true}),
        },
      },
    })
    promotiontype: Promotiontype,
  ): Promise<void> {
    await this.promotiontypeRepository.updateById(id, promotiontype);
  }

  @put('/promotiontypes/{id}', {
    responses: {
      '204': {
        description: 'Promotiontype PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() promotiontype: Promotiontype,
  ): Promise<void> {
    await this.promotiontypeRepository.replaceById(id, promotiontype);
  }

  @del('/promotiontypes/{id}', {
    responses: {
      '204': {
        description: 'Promotiontype DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.promotiontypeRepository.deleteById(id);
  }
}

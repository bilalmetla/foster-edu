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
import {RatingReasons} from '../models';
import {RatingReasonsRepository} from '../repositories';
import {secured, SecuredType} from '../auth';


export class RatingReasonsController {
  constructor(
    @repository(RatingReasonsRepository)
    public ratingReasonsRepository : RatingReasonsRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/rating-reasons', {
    responses: {
      '200': {
        description: 'RatingReasons model instance',
        content: {'application/json': {schema: getModelSchemaRef(RatingReasons)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatingReasons, {
            title: 'NewRatingReasons',
            exclude: ['id'],
          }),
        },
      },
    })
    ratingReasons: Omit<RatingReasons, 'id'>,
  ): Promise<RatingReasons> {
    return this.ratingReasonsRepository.create(ratingReasons);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/rating-reasons/count', {
    responses: {
      '200': {
        description: 'RatingReasons model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(RatingReasons)) where?: Where<RatingReasons>,
  ): Promise<Count> {
    return this.ratingReasonsRepository.count(where);
  }
  //@secured(SecuredType.IS_AUTHENTICATED)
  @get('/rating-reasons', {
    responses: {
      '200': {
        description: 'Array of RatingReasons model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RatingReasons, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RatingReasons)) filter?: Filter<RatingReasons>,
  ): Promise<RatingReasons[]> {
    
    return this.ratingReasonsRepository.find();
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/rating-reasons', {
    responses: {
      '200': {
        description: 'RatingReasons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatingReasons, {partial: true}),
        },
      },
    })
    ratingReasons: RatingReasons,
    @param.query.object('where', getWhereSchemaFor(RatingReasons)) where?: Where<RatingReasons>,
  ): Promise<Count> {
    return this.ratingReasonsRepository.updateAll(ratingReasons, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/rating-reasons/{id}', {
    responses: {
      '200': {
        description: 'RatingReasons model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RatingReasons, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(RatingReasons)) filter?: Filter<RatingReasons>
  ): Promise<RatingReasons> {
    return this.ratingReasonsRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/rating-reasons/{id}', {
    responses: {
      '204': {
        description: 'RatingReasons PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RatingReasons, {partial: true}),
        },
      },
    })
    ratingReasons: RatingReasons,
  ): Promise<void> {
    await this.ratingReasonsRepository.updateById(id, ratingReasons);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/rating-reasons/{id}', {
    responses: {
      '204': {
        description: 'RatingReasons PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ratingReasons: RatingReasons,
  ): Promise<void> {
    await this.ratingReasonsRepository.replaceById(id, ratingReasons);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/rating-reasons/{id}', {
    responses: {
      '204': {
        description: 'RatingReasons DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ratingReasonsRepository.deleteById(id);
  }
}

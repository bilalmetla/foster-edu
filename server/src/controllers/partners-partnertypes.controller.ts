import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Partners,
  Partnertypes,
} from '../models';
import {PartnersRepository} from '../repositories';

export class PartnersPartnertypesController {
  constructor(
    @repository(PartnersRepository)
    public partnersRepository: PartnersRepository,
  ) { }

  @get('/partners/{id}/partnertypes', {
    responses: {
      '200': {
        description: 'Partnertypes belonging to Partners',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partnertypes)},
          },
        },
      },
    },
  })
  async getPartnertypes(
    @param.path.string('id') id: typeof Partners.prototype.id,
  ): Promise<Partnertypes> {
    return this.partnersRepository.partnertypes(id);
  }
}

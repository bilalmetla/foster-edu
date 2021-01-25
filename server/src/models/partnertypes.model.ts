import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Partnertypes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  typeName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Partnertypes>) {
    super(data);
  }
}

export interface PartnertypesRelations {
  // describe navigational properties here
}

export type PartnertypesWithRelations = Partnertypes & PartnertypesRelations;

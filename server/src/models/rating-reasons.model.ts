import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class RatingReasons extends Entity {
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
  reason: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RatingReasons>) {
    super(data);
  }
}

export interface RatingReasonsRelations {
  // describe navigational properties here
}

export type RatingReasonsWithRelations = RatingReasons & RatingReasonsRelations;

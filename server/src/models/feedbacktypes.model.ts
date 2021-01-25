import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Feedbacktypes extends Entity {
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

  constructor(data?: Partial<Feedbacktypes>) {
    super(data);
  }
}

export interface FeedbacktypesRelations {
  // describe navigational properties here
}

export type FeedbacktypesWithRelations = Feedbacktypes & FeedbacktypesRelations;

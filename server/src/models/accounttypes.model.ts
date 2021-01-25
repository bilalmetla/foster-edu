import {Model, model, property, Entity} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Accounttypes extends Entity {
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
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Accounttypes>) {
    super(data);
  }
}

export interface AccounttypesRelations {
  // describe navigational properties here
}

export type AccounttypesWithRelations = Accounttypes & AccounttypesRelations;

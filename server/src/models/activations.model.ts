import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Activations extends Entity {
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
  phone: string;

  @property({
    type: 'number',
    required: false,
  })
  smsCode: number;

  @property({
    type: 'date',
    required: false,
  })
  expiry?: string;

  @property({
    type: 'number',
  })
  emailCode?: number;

  @property({
    type: 'date',
    default: new Date
  })
  createdTime?: Date;

  @property({
    type: 'string',

  })
  deviceId?: string

  @property({
    type: 'string',

  })
  deviceToken?: string

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Activations>) {
    super(data);
  }
}

export interface ActivationsRelations {
  // describe navigational properties here
}

export type ActivationsWithRelations = Activations & ActivationsRelations;

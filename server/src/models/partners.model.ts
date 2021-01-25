import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Partnertypes} from './partnertypes.model';
import {Orders} from './orders.model';

export interface PartnerLocationObject {
  [key: string]: any[];
}

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Partners extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'number',
  })
  pin?: number;

  @property({
    type: 'string',
    required: false,
  })
  access_token?: string;

  @property({
    type: 'date',
  })
  lastActive?: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isActivated?: boolean;

  @property({
    type: 'object',
  })
  location?: any;

  @property({
    type: 'string',
    required: false
  })
  deviceId?: string;

  @property({
    type: 'string',
    required: false
  })
  deviceToken?: string


  @property({
    type: 'date',
    default: new Date()
  })
  creationDate?: string;

  @belongsTo(() => Partnertypes)
  partnertypesId: string;

  @hasMany(() => Orders)
  orders: Orders[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Partners>) {
    super(data);
  }
}

export interface PartnersRelations {
  // describe navigational properties here
}

export type PartnersWithRelations = Partners & PartnersRelations;

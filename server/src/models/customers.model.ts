import {Entity, model, property, hasMany} from '@loopback/repository';
import {Orders} from './orders.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Customers extends Entity {
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
    type: 'string',
    
  })
  access_token?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isActivated?: boolean;

  @property({
    type: 'date',
  //  default: new Date(),
  })
  createdDate?: Date;

  @property({
    type: 'date',
  })
  updatedDate?: Date;

  @property({
    type: 'string',
  })
  deviceId?: string;

  @property({
    type: 'string',
  })
  deviceToken?: string

  @property({
    type: 'boolean',
    default : false
  })
  isWebRegistered?: boolean

  @property({
    type: 'number',
    required: false,
  })
  street?: number;

  @property({
    type: 'number',
    required: false,
  })
  house?: number;

  @property({
    type: 'string',
    required: false,
  })
  address?: string;


 @property({
    type: 'number',
    required: false,
  })
  versionCode?: number;

  
  @property({
    type: 'string',
    required: true,
  })
  userType: string;


  @hasMany(() => Orders)
  orders: Orders[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;

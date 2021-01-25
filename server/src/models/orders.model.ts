import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Orderstatuses} from './orderstatuses.model';
import {Orderdetails} from './orderdetails.model';
import {Partners} from './partners.model';
import { Customers } from './customers.model';
import { User } from './user.model';


export interface OrderLocationObject {
  [key: string]: [];
}
@model({settings: {strict: false, strictObjectIDCoercion: true}})
export class Orders extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    //default: new Date(),
  })
  orderTime?: Date;

  @property({
    type: 'date',
  })
  completionTime?: Date;

  @property({
    type: 'date',
  })
  cancelTime?: Date;

  @property({
    type: 'date',
  })
  startProgressTime?: Date;

  @property({
    type: 'string',
    required: false,
  })
  orderStatus?: string;

  @property({
    type: 'number',
    required: true,
  })
  totalBillAmount: number;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isDelivered?: boolean;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isCancelled?: boolean;

  @property({
    type: 'string',
  })
  orderCategory?: string;

  @property({
    type: 'string',
  })
  specialNotes?: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  items: object[];

  @property({
    type: 'object',
    required: false,
  })
  location?: any;

  @property({
    type: 'boolean',
    required: false,
    default: false
  })
  isOrderRatingDone?: boolean;

  @property({
    type: 'boolean',
    required: false,
    default: false
  })
  isDeleted?: boolean;

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
    type: 'boolean',
    required: false,
    default: false,
  })
  isFromWeb?: boolean;

  // @property({
  //   type: 'any',
  //   required: false,
  // })
  // web_customer?: any;


  // @belongsTo(() => Orderstatuses)
  @belongsTo(() => Orderstatuses)
  orderstatusesId: string;

  @hasMany(() => Orderdetails)
  orderdetails: Orderdetails[];

  @property({
    type: 'string',
  })
  partnersId?: string;

  @belongsTo(() => Partners)
  deliveredById: string;

  @belongsTo(() => User)
  deletedById: string;
  
  @belongsTo(() => User)
  canceledByAdminId: string;

  // @property({
  //   type: 'string',
  // })
  @belongsTo(() => Customers)
  customersId?: string;


  // @hasMany(() => Orderdetails)
  // orderdetails: Orderdetails[];

  // @belongsTo(() => Partners)
  // partnersId: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;

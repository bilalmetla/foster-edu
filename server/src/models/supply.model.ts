import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Partners} from './partners.model';
import {Products} from './products.model';
import {Units} from './units.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Supply extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // referenceNo: string;

  @property({
    type: 'string',
    required: true,
  })
  productTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  supplierName: string;

  @property({
    type: 'number',
    required: true,
  })
  quentity: number;

  @property({
    type: 'number',
    required: true,
  })
  quentityOnHand: number;

  @property({
    type: 'date',
    
  })
  supplyDate?: Date;

  @property({
    type: 'date',
  })
  arrivedAt?: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  isArrived?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  purchasingCost: number;

  @property({
    type: 'number',
  })
  travlingCost?: number;

  @property({
    type: 'number',
  })
  labourCost?: number;

  @property({
    type: 'number',
  })
  otherCost?: number;

  @belongsTo(() => Partners)
  supplierId: string;

  @belongsTo(() => Products)
  productsId: string;

  @belongsTo(() => Units)
  buyingPriceUnitId: string;

  @belongsTo(() => Units)
  quentityUnitsId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Supply>) {
    super(data);
  }
}

export interface SupplyRelations {
  // describe navigational properties here
}

export type SupplyWithRelations = Supply & SupplyRelations;

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Units} from './units.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Orderdetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  retailPrice: number | undefined;

  @property({
    type: 'number',
    required: true,
  })
  salePrice: number | undefined;

  @property({
    type: 'number',
    required: true,
  })
  purchasePrice: number | undefined;

  @property({
    type: 'string',
  })
  ordersId?: string | undefined;

  @property({
    type: 'date',
  })
  orderTime?: Date;

  @belongsTo(() => Units)
  retailPriceUnitsId: string;

  @belongsTo(() => Units)
  purchasePriceUnitsId: string;

  @belongsTo(() => Units)
  salePriceUnitsId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Orderdetails>) {
    super(data);
  }
}

export interface OrderdetailsRelations {
  // describe navigational properties here
}

export type OrderdetailsWithRelations = Orderdetails & OrderdetailsRelations;

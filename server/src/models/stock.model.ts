import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Products} from './products.model';
import {Units} from './units.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Stock extends Entity {
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
  quantity: string;

  @belongsTo(() => Products)
  productsId: string;

  @belongsTo(() => Units)
  unitsId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;

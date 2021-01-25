import {Entity, model, property, belongsTo} from '@loopback/repository';
import {RatingReasons} from './rating-reasons.model';
import {Orders} from './orders.model';
import {Customers} from './customers.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class OrderRatings extends Entity {
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
  points: number;

  @property({
    type: 'string',
  })
  reasonMessage?: string;

  @property({
    type: 'date',
   // default: new Date(),
  })
  createdDate?: Date;

  

  @belongsTo(() => RatingReasons)
  ratingReasonsId: string;

  @belongsTo(() => Orders)
  ordersId: string;

  @belongsTo(() => Customers)
  customersId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderRatings>) {
    super(data);
  }
}

export interface OrderRatingsRelations {
  // describe navigational properties here
}

export type OrderRatingsWithRelations = OrderRatings & OrderRatingsRelations;

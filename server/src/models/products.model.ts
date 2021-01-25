import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Units} from './units.model';
import {Producttypes} from './producttypes.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Products extends Entity {
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
  eng_title: string;

  @property({
    type: 'string',
    required: true,
  })
  urdu_title: string;

  @property({
    type: 'string',
    required: true,
  })
  displayName: string;

  @property({
    type: 'string',
    deafult: ''
  })
  image?: string;

  @property({
    type: 'string',
    deafult: ''
  })
  imageUrl?: string;

  @property({
    type: 'number',
    
  })
  quentityOnHand?: number;

  @property({
    type: 'number',
  })
  buyingPrice: number;

  @property({
    type: 'number',
    default: 0,
  })
  totalCost?: number;

  @property({
    type: 'number',
    default: 0,
  })
  salePrice?: number;

  @property({
    type: 'number',
    default: 0,
  })
  retailPrice?: number;

  @property({
    type: 'number',
    default: 0,
  })
  discountAmount?: number;

  @property({
    type: 'date',
    default: new Date()
  })
  createdDate?: Date;

  @property({
    type: 'string',
    default: ''
  })
  description?: string;

  @property({
    type: 'boolean',
    default: true
  })
  isAvailable?: boolean;

  @property({
    type: 'number',
    default: 1
  })
  displayingPeriority?: number;

  @belongsTo(() => Units)
  buyingPriceUnitsId: string;

  @belongsTo(() => Units)
  salePriceUnitsId: string;

  @belongsTo(() => Units)
  retailPiceUnitsId: string;

  @belongsTo(() => Units)
  quentityUnitsId: string;


  @belongsTo(() => Producttypes)
  producttypesId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Promotiontype} from './promotiontype.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Promotion extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  promotionValue: number;

  @property({
    type: 'boolean',
    default: false,
  })
  isPromotionValueFixed: boolean;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  imageUrl?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdDate?: Date;

  @property({
    type: 'date',
    default: new Date(),
  })
  effectiveDate?: Date;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  endDate: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  isActive?: boolean;

  @belongsTo(() => Promotiontype)
  promotiontypeId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Promotion>) {
    super(data);
  }
}

export interface PromotionRelations {
  // describe navigational properties here
}

export type PromotionWithRelations = Promotion & PromotionRelations;

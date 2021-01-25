import {Entity, model, property, belongsTo} from '@loopback/repository';
import {PricePlanTypes} from './price-plan-types.model';

@model({settings: {strict: false, strictObjectIDCoercion: true}})
export class PricePlan extends Entity {
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
  })
  shortCode?: string;

  @property({
    type: 'number',
    required: true,
  })
  chargeValue: number;


  @property({
    type: 'number',
    default: 0,
  })
  inputMin?: number;

  @property({
    type: 'number',
    default: 0,
  })
  inputMax?: number;

  @property({
    type: 'number',
    default: 0,
  })
  minFees?: number;

  @property({
    type: 'number',
    default: 0,
  })
  maxFees?: number;

  @property({
    type: 'date',
    default: new Date(),
  })
  effectiveFrom?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  effectiveTo?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isApplied?: boolean;

  @belongsTo(() => PricePlanTypes)
  pricePlanTypesId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PricePlan>) {
    super(data);
  }
}

export interface PricePlanRelations {
  // describe navigational properties here
}

export type PricePlanWithRelations = PricePlan & PricePlanRelations;

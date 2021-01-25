import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true, strictObjectIDCoercion: true}})
export class PricePlanTypes extends Entity {
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


  constructor(data?: Partial<PricePlanTypes>) {
    super(data);
  }
}

export interface PricePlanTypesRelations {
  // describe navigational properties here
}

export type PricePlanTypesWithRelations = PricePlanTypes & PricePlanTypesRelations;

import {model, property, belongsTo, Entity} from '@loopback/repository';
import {Accounttypes} from './accounttypes.model';
import {Customers} from './customers.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Accounts extends Entity {
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
  accountNo: string;

  @property({
    type: 'string',
  })
  credit?: string;

  @property({
    type: 'number',
  })
  debit?: number;

  @belongsTo(() => Accounttypes)
  accounttypesId: string;

  @belongsTo(() => Customers)
  customersId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Accounts>) {
    super(data);
  }
}

export interface AccountsRelations {
  // describe navigational properties here
}

export type AccountsWithRelations = Accounts & AccountsRelations;

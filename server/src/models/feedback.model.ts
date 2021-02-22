import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customers} from './customers.model';
import {Feedbacktypes} from './feedbacktypes.model';
import {Partners} from './partners.model';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Feedback extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  fullname: string;

  @property({
    type: 'string',
    required: false,
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;
 
  @property({
    type: 'string',
    required: false,
  })
  feedbackreason?: string;

  @property({
    type: 'boolean',
    required: false,
    default: false
  })
  isReviewed: boolean;

  @property({
    type: 'date',
    //default: new Date(),
  })
  createdDate?: Date;

  @property({
    type: 'string',
    required: true,
  })
  byId: string;
  
  
  @property({
    type: 'string',
    required: false
  })
  toId?: string;
 
 
  @property({
    type: 'string',
    required: false
  })
  reviewedById?: string;


  @property({
    type: 'number',
    required: true
  })
  stars: number;

  
  @belongsTo(() => Feedbacktypes)
  feedbacktypesId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Feedback>) {
    super(data);
  }
}

export interface FeedbackRelations {
  // describe navigational properties here
}

export type FeedbackWithRelations = Feedback & FeedbackRelations;

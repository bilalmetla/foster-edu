import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
//@model({settings: {strict: false,strictObjectIDCoercion: true}})

export class StudyRequests extends Entity {
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
  from: string;
 
  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    default: 'Pending',
  })
  status?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isSeen?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isReplied?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  subjects: string;

  @property({
    type: 'string',
    required: true,
  })
  lessonType: string;

  @property({
    type: 'string',
  })
  grades?: string;

  @property({
    type: 'string',
    required: true,
  })
  timeFrom: string;

  @property({
    type: 'string',
    required: true,
  })
  timeTo: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  messages?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StudyRequests>) {
    super(data);
  }
}

export interface StudyRequestsRelations {
  // describe navigational properties here
}

export type StudyRequestsWithRelations = StudyRequests & StudyRequestsRelations;

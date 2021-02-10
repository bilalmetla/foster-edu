import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Classes extends Entity {
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
  timeFrom: string;

  @property({
    type: 'string',
    required: true,
  })
  timeTo: string;

  @property({
    type: 'string',
    required: true,
  })
  instructorId: string;

  @property({
    type: 'string',
    required: true,
  })
  studentId: string;

  @property({
    type: 'string',
    required: true,
  })
  requestId: string;

  @property({
    type: 'string',
    default: true,
  })
  lessonType: string;

  @property({
    type: 'string',
  })
  onlineClassSessionId?: string;

  @property({
    type: 'number',
    required: true,
  })
  fees: number;

  @property({
    type: 'string',
    required: true
  })
  feesPer: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Classes>) {
    super(data);
  }
}

export interface ClassesRelations {
  // describe navigational properties here
}

export type ClassesWithRelations = Classes & ClassesRelations;


import {Entity, model, property} from '@loopback/repository';

@model()
export class ErrorResponse extends Entity {
  
 @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'number',
    required: true,
  })
  statusCode: number;

  @property({
    type: 'string',
    
  })
  name?: string;

  @property({
    type: 'string',
    
  })
  code?: string;

  constructor(data?: Partial<ErrorResponse>) {
    super(data);
  }

}

export interface ErrorResponseRelations {
  // describe navigational properties here
}

export type ErrorResponseWithRelations = ErrorResponse & ErrorResponseRelations;


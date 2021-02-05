import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class User extends Entity {
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
  username: string;

  @property({
    type: 'string',
    
  })
  password?: string;

  @property({
    type: 'string',
    
  })
  access_token?: string;
  
  @property({
    type: 'string',
    
  })
  name?: string;

  @property({
    type: 'string',
    required: false,
  })
  email?: string;

  @property({
    type: 'string',
    required: false,
  })
  securityId?: string;



  constructor(data?: Partial<User>) {
    super(data);
  }
}


export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
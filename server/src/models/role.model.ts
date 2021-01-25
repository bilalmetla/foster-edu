import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false,strictObjectIDCoercion: true}})
export class Role extends Entity {
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
  description: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}


export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
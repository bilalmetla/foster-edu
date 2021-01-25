import {Entity, model, property} from '@loopback/repository';

@model()
export class Configurations extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  androidAppVersion?: string;

  @property({
    type: 'string',
  })
  sms_username?: string;

  @property({
    type: 'string',
  })
  sms_password?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isProductionInstance?: boolean;

  @property({
    type: 'string',
  })
  storeDeviceToken?: string;


  constructor(data?: Partial<Configurations>) {
    super(data);
  }
  
}

export interface ConfigurationsRelations {
  // describe navigational properties here
}

export type ConfigurationsWithRelations = Configurations & ConfigurationsRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Orders} from './orders.model';
//import {StudyRequests} from './study-requests.model';

// export interface location {
//   [key: string]: [];
// }
 //@model({settings: {strict: false,strictObjectIDCoercion: true}})
 @model({settings: {strict: false}})
export class Customers extends Entity {
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
  name: string;
 
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;
  
  @property({
    type: 'string',
    required: false,
  })
  imageUrl?: string;

  @property({
    type: 'string',
    required: false,
  })
  phone: string;

  @property({
    type: 'string',
    required: false,
  })
  access_token?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isActivated?: boolean;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdDate?: Date;

  @property({
    type: 'date',
    default: new Date(),
  })
  updatedDate?: Date;

  @property({
    type: 'string',
  })
  deviceId?: string;

  @property({
    type: 'string',
  })
  deviceToken?: string

  @property({
    type: 'boolean',
    default : false
  })
  isWebRegistered?: boolean

  @property({
    type: 'number',
    required: false,
  })
  street?: number;

  @property({
    type: 'number',
    required: false,
  })
  house?: number;

  @property({
    type: 'string',
    required: false,
  })
  address?: string;


 @property({
    type: 'number',
    required: false,
  })
  versionCode?: number;

  
  @property({
    type: 'string',
    required: true,
  })
  userType: string;

  @property({
    type: 'string',
    required: false,
  })
  email: string;
  
  @property({
    type: 'string',
    required: false,
  })
  userPassword?: string;
  
  @property({
    type: 'string',
    required: false,
  })
  tagLine: string;

  @property({
    type: 'number',
    required: false,
  })
  fees: number;

  @property({
    type: 'string',
    required: false,
  })
  feesPer: string;

  @property({
    type: 'string',
    required: false,
  })
  gender: string;

  @property({
    type: 'string',
    required: false,
  })
  greateTutorLine: string;
  
  
  @property({
    type: 'string',
    required: false,
  })
  teachingExperienceLine: string;
 
  @property({
    type: 'object',
  })
  location?: any;
  
  @property({
    type: 'array',
    itemType: 'object',
    required: false,
  })
  education: object[];

  @property({
    type: 'boolean',
    default : true
  })
  isOnlineTeaching?: boolean

  @property({
    type: 'boolean',
    default : false
  })
  isOfflineTeaching?: boolean

  @property({
    type: 'boolean',
    default : false
  })
  isPublicContactInfo?: boolean

  @property({
    type: 'string',
  })
  addressLine?: string
  
  @property({
    type: 'array',
    itemType: 'string',
    required: false,
  })
  teachingSubjects?: string[];
 
  @property({
    type: 'array',
    itemType: 'string',
    required: false,
  })
  teachingGrades?: string[];
 
 
  @property({
    type: 'string',
    required: false,
  })
  teachingArea?: string;
  
  
  @property({
    type: 'string',
    required: false,
  })
  teachingCity?: string;



  @hasMany(() => Orders)
  orders?: Orders[];

  // @hasMany(() => StudyRequests, {keyTo: 'from'})
  // studyRequests: StudyRequests[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;

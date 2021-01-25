import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import { CONSTANTS } from '../constants';
import {JWT_SECRET} from '../auth';
//const uuid = require("uuid");
import {promisify} from 'util';
const {sign, verify, decode} = require('jsonwebtoken');
const signAsync = promisify(sign);
const verifyAsync = promisify(verify);
import {secured, SecuredType} from '../auth';
import { winstonLogger as logger } from "../logger";

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    const tokenObject = {username: user.username};
    let token = await signAsync(tokenObject, JWT_SECRET);
    user.password = await signAsync(user.password, JWT_SECRET);

    user.access_token = token;
    return this.userRepository.create(user);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  
  @post('/users/login', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async userLogin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'loginUser',
            exclude: ['id','access_token', 'name','email'],
          }),
        },
      },
    })
    user: User,
    
  ): Promise<User | any> {
    try{
    //const userInfo = this.userRepository.findOne({"where":{phone}});
    const userInfo = await this.userRepository.findOne({"where":{username:user.username}});
    let pwd = await signAsync(user.password, JWT_SECRET);
    //logger.debug("jwt signed password: ", pwd);
    let dbPassword = await verifyAsync(userInfo?.password, JWT_SECRET);
    if(!userInfo){
      return CONSTANTS.AUTHNETICATION_FAILED;
    }
    else if(dbPassword=== user.password){
      return userInfo;
    }else{
      return CONSTANTS.AUTHNETICATION_FAILED;
    }
    
  }catch(ex){
    logger.debug(ex);
    return CONSTANTS.AUTHNETICATION_FAILED;
  }

  }



}

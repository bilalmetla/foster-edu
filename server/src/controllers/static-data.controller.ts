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
  import {RatingReasons, Customers, Orders} from '../models';
  import {RatingReasonsRepository, CustomersRepository, OrdersRepository, ConfigurationsRepository} from '../repositories';
import { winstonLogger as logger } from "../logger";

  
  export class StaticDataController {
    constructor(
      @repository(RatingReasonsRepository)
      public ratingReasonsRepository : RatingReasonsRepository,
      @repository(CustomersRepository)
      public customersRepository : CustomersRepository,
      @repository(OrdersRepository)
      public ordersRepository : OrdersRepository,
      @repository(ConfigurationsRepository)
      public configurationsRepository : ConfigurationsRepository,

      

    ) {   }


    //@secured(SecuredType.IS_AUTHENTICATED)
  @get('/static-data', {
    responses: {
      '200': {
        description: 'Array of Static Data',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              //items: getModelSchemaRef(RatingReasons, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    //@requestBody() inputs: {customersId: {type:'string'}},
    @param.query.string('customerId') customerId: string
   
  ): Promise<any> {
    const arr_resp: any = {
      ratingList: [],
      ratingPending:[],
      androidAppVersion: ''
    };
    
    const ratingList =  await this.ratingReasonsRepository.find();
    arr_resp.ratingList = ratingList;
    if(customerId){
      
      let orderFlter = {
        where:{"and":[{customersId: customerId}, {isOrderRatingDone: false}, {isDelivered: true} ]},
        fields:{id:true}
      }         
      const pendingRatesOrders = await this.ordersRepository.find(orderFlter);
      arr_resp.ratingPending = pendingRatesOrders;
    }
    //end for order rating things

    const configurations = await this.configurationsRepository.find();

    logger.debug("Found configurations ..", configurations);
    if(configurations && configurations.length > 0){
      arr_resp.androidAppVersion = configurations[0].androidAppVersion;
    }

    
    return arr_resp;
  }


  }
import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {AuthenticationBindings, AuthenticateFn} from '@loopback/authentication';
import { CONSTANTS } from './constants';
const SequenceActions = RestBindings.SequenceActions;
import { winstonLogger as logger } from "./logger";
const uuid = require("uuid");


export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION) protected authenticateRequest: AuthenticateFn,

  ) {}

  async handle(context: RequestContext) {
    let startTime = process.hrtime();
    let requestId = uuid.v4();
    try {
      if(process.env.requests){
        process.env.requests = (parseInt(process.env.requests)+1).toString();
      }
      
      logger.info('-----------------------request-------------------------------');
      logger.info(`requestId: ${requestId} | api:  ${context.request.path}`);
      if(context.request.path == '/' && process.env.homePage){
          process.env.homePage = (parseInt(process.env.homePage)+1).toString();
        
      }
      if(context.request.path == '/wordpress/index.html%3Fp=226.html' && process.env.productPage){
        process.env.productPage = (parseInt(process.env.productPage)+1).toString();
      
    }
      logger.debug(`requestId: ${requestId} | header:  ${JSON.stringify(context.request.headers)}`);
            
      const {request, response} = context;
      const route = this.findRoute(request);      
      const args = await this.parseParams(request, route);
      
      logger.debug(`requestId: ${requestId} | request:  ${JSON.stringify(args) } | route ${route}`);
      
       //call authentication action
       await this.authenticateRequest(request);
      const result = await this.invoke(route, args);

      logger.debug(`requestId: ${requestId} | response:  ${JSON.stringify(result) } | route ${route}`);

      if(process.env.successResponses){
        process.env.successResponses = (parseInt(process.env.successResponses)+1).toString();
      }
      calculateResponseTime(startTime);
      this.send(response, result);

    } catch (err) {
      logger.error(` ${JSON.stringify(err.stack) }`)
      if(process.env.errorResponses){
        process.env.errorResponses = (parseInt(process.env.errorResponses)+1).toString();
      }

      logger.error(`requestId: ${requestId} | error:  ${JSON.stringify(err) }`);
      if (
        err.code === 'AUTHENTICATION_STRATEGY_NOT_FOUND' ||
        err.code === 'USER_PROFILE_NOT_FOUND'
      ) {
                
        logger.error(`requestId: ${requestId} | err.code:  ${JSON.stringify(err) }`)
        
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }

     logger.error(`requestId: ${requestId} | reject err:  ${JSON.stringify(err) }`) ;
      if(err.message && typeof err.message === 'object'){
        err.message = "Valid Access Token Required!";
      }
     
      logger.error(`requestId: ${requestId} | sending final err:  ${JSON.stringify(err) }`)

      calculateResponseTime(startTime);
      this.reject(context, err);
    }
  }

  
}

function calculateResponseTime (startTime: [number, number]): void {
  if(startTime && startTime.length > 1) {
      var dx = process.hrtime(startTime);
      var time = (dx[0] * 1000) + (dx[1] / 1000000); // converting time to milli seconds
      
      process.env.lastResponseTime = time.toString();
      if(process.env.avgResponseTime && process.env.requests){
        process.env.avgResponseTime = ( (parseInt(process.env.avgResponseTime + time)/parseInt(process.env.requests)).toFixed(2) ).toString();
      }      
  }
}


import {ErrorResponse} from '../models';

export class CONSTANTS {  
  
  public static readonly  SYSTEM_ERROR = {error: new ErrorResponse({statusCode: 500, name: "Internal Server Error", code:"SYSTEM_ERROR", message: "System Error!"}) };  
  public static readonly  ACTIVATION_FAILED = {error: new ErrorResponse({statusCode: 403, name: "Forbidden", code:"ACTIVATION_FAILED", message: "Activation Failed!"}) };
  public static readonly  HAWKER_NOT_AVAILABLE = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"HAWKER_NOT_AVAILABLE", message: "No Hawker Availabe!"}) };
  public static readonly  ORDER_NOT_PLACED = {error: new ErrorResponse({statusCode: 422, name: "Unprocessable Entity", code:"ORDER_NOT_PLACED", message: "Order Not Placed, Try Again!"}) };
  public static readonly  AUTHNETICATION_FAILED = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"AUTHNETICATION_FAILED", message: "Authentication Failed!"}) };  
  public static readonly  PRODUCT_NOT_FOUND = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"PRODUCT_NOT_FOUND", message: "Product Not Found For This Supply"}) };  
  public static readonly  NO_SUPPLY_EXISTS = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"NO_SUPPLY_EXISTS", message: "Supply Not Found!"}) };  
  public static readonly  ORDER_DETAILS_NOT_CREATED = {error: new ErrorResponse({statusCode: 204, name: "No Content", code:"ORDER_DETAILS_NOT_CREATED", message: "Order Detail Not Created!"}) };  
  public static readonly  PRODUCT_NOT_UPDATED = {error: new ErrorResponse({statusCode: 403, name: "Forbidden", code:"PRODUCT_NOT_UPDATED", message: "Product Not Updated!"}) };  
  public static readonly  PRICEPLAN_NOT_FOUND = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"PRICEPLAN_NOT_FOUND", message: "PricePlan Not Found!"}) };  
  public static readonly  PEOMOTION_NOT_FOUND = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"PEOMOTION_NOT_FOUND", message: "Promotion Not Found!"}) };  
  public static readonly  INVALID_PHONE_NUMBER = {error: new ErrorResponse({statusCode: 400, name: "Bad Request", code:"INVALID_PHONE_NUMBER", message: "Phone Number Is Invalid!"}) };  
  public static readonly  ACTIVATION_NOT_FOUND = {error: new ErrorResponse({statusCode: 404, name: "Not Found", code:"ACTIVATION_NOT_FOUND", message: "OTP Not Found!"}) };  
  public static readonly  ACTIVATION_RESENT = {result: new ErrorResponse({statusCode: 200, name: "Ok", code:"ACTIVATION_RESENT", message: "OTP Resent!"}) };  
  public static readonly  DEVICE_TOKEN_INVALID = {error: new ErrorResponse({statusCode: 400, name: "Bad Request", code:"DEVICE_TOKEN_INVALID", message: "Invalid Token Sent!"}) };  

    
  }
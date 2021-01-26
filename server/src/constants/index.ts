import {ErrorResponse} from '../models';

export class CONSTANTS {  
  
  public static readonly  SYSTEM_ERROR = {error: new ErrorResponse({resultCode: '500', name: "Internal Server Error", code:"SYSTEM_ERROR", message: "System Error!"}) };  
  public static readonly  ACTIVATION_FAILED = {error: new ErrorResponse({resultCode: '403', name: "Forbidden", code:"ACTIVATION_FAILED", message: "Activation Failed!"}) };
  public static readonly  HAWKER_NOT_AVAILABLE = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"HAWKER_NOT_AVAILABLE", message: "No Hawker Availabe!"}) };
  public static readonly  ORDER_NOT_PLACED = {error: new ErrorResponse({resultCode: '422', name: "Unprocessable Entity", code:"ORDER_NOT_PLACED", message: "Order Not Placed, Try Again!"}) };
  public static readonly  AUTHNETICATION_FAILED = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"AUTHNETICATION_FAILED", message: "Authentication Failed!"}) };  
  public static readonly  PRODUCT_NOT_FOUND = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"PRODUCT_NOT_FOUND", message: "Product Not Found For This Supply"}) };  
  public static readonly  NO_SUPPLY_EXISTS = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"NO_SUPPLY_EXISTS", message: "Supply Not Found!"}) };  
  public static readonly  ORDER_DETAILS_NOT_CREATED = {error: new ErrorResponse({resultCode: '204', name: "No Content", code:"ORDER_DETAILS_NOT_CREATED", message: "Order Detail Not Created!"}) };  
  public static readonly  PRODUCT_NOT_UPDATED = {error: new ErrorResponse({resultCode: '403', name: "Forbidden", code:"PRODUCT_NOT_UPDATED", message: "Product Not Updated!"}) };  
  public static readonly  PRICEPLAN_NOT_FOUND = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"PRICEPLAN_NOT_FOUND", message: "PricePlan Not Found!"}) };  
  public static readonly  PEOMOTION_NOT_FOUND = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"PEOMOTION_NOT_FOUND", message: "Promotion Not Found!"}) };  
  public static readonly  INVALID_PHONE_NUMBER = {error: new ErrorResponse({resultCode: '400', name: "Bad Request", code:"INVALID_PHONE_NUMBER", message: "Phone Number Is Invalid!"}) };  
  public static readonly  ACTIVATION_NOT_FOUND = {error: new ErrorResponse({resultCode: '404', name: "Not Found", code:"ACTIVATION_NOT_FOUND", message: "OTP Not Found!"}) };  
  public static readonly  ACTIVATION_RESENT = {result: new ErrorResponse({resultCode: '2001', name: "Ok", code:"ACTIVATION_RESENT", message: "OTP Resent!"}) };  
  public static readonly  DEVICE_TOKEN_INVALID = {error: new ErrorResponse({resultCode: '400', name: "Bad Request", code:"DEVICE_TOKEN_INVALID", message: "Invalid Token Sent!"}) };  
  public static readonly  INVALID_EMAIL_ADDRESS = {error: new ErrorResponse({resultCode: '2001', name: "Bad Request", code:"INVID_EMAIL", message: "Email Not Exists!"}) };  
  public static readonly  EMAIL_ALREADY_EXISTS = {error: new ErrorResponse({resultCode: '2001', name: "Bad Request", code:"DUPLICATE_EMAIL", message: "Email Already Exists!"}) };  
  public static readonly  EMAIL_VERIFICATION_SUCCESS = {error: new ErrorResponse({resultCode: '2001', name: "", code:"EMAIL_VERIFICATION_SUCCESS", message: "Thanks, Your email is verified"}) };  
  public static readonly  EMAIL_VERIFICATION_FAILED = {error: new ErrorResponse({resultCode: 'ER3001', name: "", code:"EMAIL_VERIFICATION_FAILED", message: "Your email verification link is Expired!"}) };  
  public static readonly  USER_NOT_EXISTS = {error: new ErrorResponse({resultCode: 'ER3002', name: "", code:"USER_NOT_EXISTS", message: "User not found. Please register first!"}) };  
  public static readonly  USER_NOT_ACTIVATED = {error: new ErrorResponse({resultCode: 'ER3003', name: "", code:"USER_NOT_ACTIVATED", message: "User not activated!"}) };  
  public static readonly  CREDIENTIALS_MISMATCHED = {error: new ErrorResponse({resultCode: 'ER3004', name: "", code:"CREDIENTIALS_MISMATCHED", message: "Your credientials are wrong!"}) };  
  

    
  }
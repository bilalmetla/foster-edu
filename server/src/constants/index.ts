import {ErrorResponse} from '../models';

export class CONSTANTS {  
  
  public static readonly  SYSTEM_ERROR = new ErrorResponse({resultCode: '500', name: "Internal Server Error", code:"SYSTEM_ERROR", message: "System Error!"}) ;  
  public static readonly  ACTIVATION_FAILED =  new ErrorResponse({resultCode: '403', name: "Forbidden", code:"ACTIVATION_FAILED", message: "Activation Failed!"})
  public static readonly  HAWKER_NOT_AVAILABLE =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"HAWKER_NOT_AVAILABLE", message: "No Hawker Availabe!"})
  public static readonly  ORDER_NOT_PLACED =  new ErrorResponse({resultCode: '422', name: "Unprocessable Entity", code:"ORDER_NOT_PLACED", message: "Order Not Placed, Try Again!"})
  public static readonly  AUTHNETICATION_FAILED =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"AUTHNETICATION_FAILED", message: "Authentication Failed!"})  
  public static readonly  PRODUCT_NOT_FOUND =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"PRODUCT_NOT_FOUND", message: "Product Not Found For This Supply"})  
  public static readonly  NO_SUPPLY_EXISTS =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"NO_SUPPLY_EXISTS", message: "Supply Not Found!"})  
  public static readonly  ORDER_DETAILS_NOT_CREATED =  new ErrorResponse({resultCode: '204', name: "No Content", code:"ORDER_DETAILS_NOT_CREATED", message: "Order Detail Not Created!"})  
  public static readonly  PRODUCT_NOT_UPDATED =  new ErrorResponse({resultCode: '403', name: "Forbidden", code:"PRODUCT_NOT_UPDATED", message: "Product Not Updated!"})  
  public static readonly  PRICEPLAN_NOT_FOUND =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"PRICEPLAN_NOT_FOUND", message: "PricePlan Not Found!"})  
  public static readonly  PEOMOTION_NOT_FOUND =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"PEOMOTION_NOT_FOUND", message: "Promotion Not Found!"})  
  public static readonly  INVALID_PHONE_NUMBER =  new ErrorResponse({resultCode: '400', name: "Bad Request", code:"INVALID_PHONE_NUMBER", message: "Phone Number Is Invalid!"})  
  public static readonly  ACTIVATION_NOT_FOUND =  new ErrorResponse({resultCode: '404', name: "Not Found", code:"ACTIVATION_NOT_FOUND", message: "OTP Not Found!"})  
  public static readonly  ACTIVATION_RESENT = new ErrorResponse({resultCode: '2001', name: "Ok", code:"ACTIVATION_RESENT", message: "OTP Resent!"})  
  public static readonly  DEVICE_TOKEN_INVALID =  new ErrorResponse({resultCode: '400', name: "Bad Request", code:"DEVICE_TOKEN_INVALID", message: "Invalid Token Sent!"})  
  public static readonly  INVALID_EMAIL_ADDRESS =  new ErrorResponse({resultCode: '2001', name: "Bad Request", code:"INVID_EMAIL", message: "Email Not Exists!"})  
  public static readonly  EMAIL_ALREADY_EXISTS =  new ErrorResponse({resultCode: '2001', name: "Bad Request", code:"DUPLICATE_EMAIL", message: "Email Already Exists!"})  
  public static readonly  EMAIL_VERIFICATION_SUCCESS =  new ErrorResponse({resultCode: '2001', name: "", code:"EMAIL_VERIFICATION_SUCCESS", message: "Thanks, Your email is verified"})  
  public static readonly  EMAIL_VERIFICATION_FAILED =  new ErrorResponse({resultCode: 'ER3001', name: "", code:"EMAIL_VERIFICATION_FAILED", message: "Your email verification link is Expired!"})  
  public static readonly  USER_NOT_EXISTS =  new ErrorResponse({resultCode: 'ER3002', name: "", code:"USER_NOT_EXISTS", message: "User not found. Please register first!"})  
  public static readonly  USER_NOT_ACTIVATED =  new ErrorResponse({resultCode: 'ER3003', name: "", code:"USER_NOT_ACTIVATED", message: "User not activated!"})  
  public static readonly  CREDIENTIALS_MISMATCHED =  new ErrorResponse({resultCode: 'ER3004', name: "", code:"CREDIENTIALS_MISMATCHED", message: "Your credientials are wrong!"})  
  public static readonly  RESET_PASSWORD_LINK_SENT =  new ErrorResponse({resultCode: '2001', name: "", code:"RESET_PASSWORD_LINK_SENT", message: "Your reset password link is sent."})  
  public static readonly  RESET_PASSWORD_FAILED =  new ErrorResponse({resultCode: 'ER3005', name: "", code:"RESET_PASSWORD_FAILED", message: "Your reset password failed."})  
  public static readonly  SUCCESS_RESPONSE =  {resultCode: '2001', name: "", code:"SUCCESS_RESPONSE", message: "Successfully Added!"}
  public static readonly  BAD_REQUEST =  new ErrorResponse({resultCode: 'ER0400', name: "", code:"BAD_REQUEST", message: "Your Reques Is Not Valid!"} )
  

    
  }

import {post} from "./HttpClient";

export function signUp(data) {
   return post(data, '/customers/register')
  }

  export function verifyEmail(data) {
   return post(data, `/customers/verify/email`)
  }

  export function login(data) {
   return post(data, `/customers/login`)
  }

import {post} from "./HttpClient";

export function signUp(data) {
   return post(data, '/customers/activate')
  }
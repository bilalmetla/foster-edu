
import {post, put, get} from "./HttpClient";

export function signUp(data) {
   return post(data, '/customers/register')
  }

  export function verifyEmail(data) {
   return post(data, `/customers/verify/email`)
  }

  export function login(data) {
   return post(data, `/customers/login`)
  }

  export function forGotPassword(data) {
   return post(data, `/customers/forgotPassword`)
  }
  
  export function passwordReset(data, urlParams) {
   return post(data, `/customers/${urlParams.customerId}/passwordReset`)
  }
  
  export function getCustomerById(customerId) {
   return get(`/customers/${customerId}`)
  }

  export function updateCustomerInfo(data, urlParams) {
   return put(data, `/customers/${urlParams.customerId}`)
  }

  export function getTutors(filterParams= {}) {
   filterParams.userType = 'tutor'
     
      let filter = {
        where:{
           and:[]
        }
     }
     filter.where.and.push(filterParams)
     //filter.where = filterParams
      return get(`/customers?filter=${JSON.stringify(filter)}`)
  }


  export function sendContactUs(data) {
   return post(data, `/web/contact-us`)
  }
 
  export function studyRequests(data) {
   return post(data, `/study-requests`)
  }
 
  export function getStudentRequests(filterParams= {}) {
   
      let filter = {
        where:{
          // or:[]
        }
     }
     filter.where.or = filterParams
       //filter.where = filterParams
      return get(`/study-requests?filter=${JSON.stringify(filter)}`)
  }
  
  export function getMessages(filterParams= {}) {
   
      let filter = {
        where:{
           and:[]
        }
     }
     filter.where.and.push(filterParams)
      // filter.where = filterParams
      return get(`/messages?filter=${JSON.stringify(filter)}`)
  }
  
  export function getConnectedUsers(filterParams= {}) {
   
      let filter = {
        where:{
           and:[]
        }
     }
     filter.where.and.push(filterParams)
      // filter.where = filterParams
      return get(`/connections?filter=${JSON.stringify(filter)}`)
  }

  export function getMyClasses(filterParams= {}) {
   
      let filter = {
        where:{
          // ...filterParams
        }
     }
     filter.where.or = filterParams
      // filter.where = filterParams
      return get(`/classes?filter=${JSON.stringify(filter)}`)
  }

  export function getStudentRequestById(id) {
  
   return get(`/study-requests/${id}`)
}

export function createClassRequest(data) {
   return post(data, `/classes`)
  }

  export function uploadCustomerImage(data) {
   return post(data, `/customers/upload/image`)
  }
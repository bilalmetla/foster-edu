
import { constants } from "../constants";


var  REACT_APP_API_BASE_URL = constants.api_server()


export function get(url) {

    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response =>
      response.json()
    );
  }

  export function post(data, pathName) {
   
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' ,
        //'Authorization': 'Bearer ' +access_token
      },
      body: JSON.stringify(data)
    }
    let url = `${REACT_APP_API_BASE_URL}${pathName}`
    return fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response
      }
    })
    

  }

  export function put(data, pathName) {
   
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' ,
        //'Authorization': 'Bearer ' +access_token
      },
      body: JSON.stringify(data)
    }
    let url = `${REACT_APP_API_BASE_URL}${pathName}`
    return fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response
      }
    })
    

  }

  export function loadImage(url) {

    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response => response)
  }
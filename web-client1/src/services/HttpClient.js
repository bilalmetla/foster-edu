
var  REACT_APP_API_BASE_URL = 'http://127.0.0.1:3000';


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
  };
    // return fetch(`${REACT_APP_API_BASE_URL}${url}`, requestOptions)
    // .then(response =>
    //   response.json()
    // )
    // .catch(error => {
    //   console.log('http error', error)
    // })

    let url = `${REACT_APP_API_BASE_URL}${pathName}`
    return fetch(url, requestOptions)
    .then((response) => {
     // console.log('response', response)
      if (response.ok) {
        return response.json();
      } else {
        return response
      }
    })
    

  }
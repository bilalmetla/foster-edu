
var  REACT_APP_API_BASE_URL = 'http://127.0.0.1:3000';


export function get(url) {

    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response =>
      response.json()
    );
  }

  export function post(data, url) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response =>
      response.json()
    );
  }
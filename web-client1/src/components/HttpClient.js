

export function get(url) {
    let REACT_APP_API_BASE_URL = 'http://127.0.0.1'
    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response =>
      response.json()
    );
  }

  export function post(url) {
    let REACT_APP_API_BASE_URL = 'http://127.0.0.1'
    return fetch(`${REACT_APP_API_BASE_URL}${url}`).then(response =>
      response.json()
    );
  }
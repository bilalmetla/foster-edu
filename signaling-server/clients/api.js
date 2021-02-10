
const axios = require('axios').default;


const basePath = 'http://127.0.0.1:3000'

exports.post = async (url, data)=>{
    return await axios.post(basePath + url, data) 
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return Promise.resolve(response.data)
      })
      .catch(function (error) {
        console.log(error);
        return Promise.rejected(error)

      });
    
}


export const constants =  {
    isStaging: false,
    isProductionDeployment: false,

    isStagingSignalling: false,
    isProductionDeploymentSignalling: false,
    
   
    
}

constants.api_server = function (){
    // if(this.isProductionDeployment){
    //     return '/' //'https://foster-dev.herokuapp.com'
    // }else if(this.isStaging){
    //     return '/' //'https://foster-dev.herokuapp.com'
    // }else {
    //     return 'http://127.0.0.1:3000'
    // }
    return `${window.location.protocol}//${window.location.hostname}`
}

constants.signalling_server = function (){
    // if(this.isProductionDeploymentSignalling){
    //     return 'https://foster-signalling.herokuapp.com'
    // }else if(this.isStagingSignalling){
    //     return 'https://foster-signalling.herokuapp.com'
    // }else {
    //     return 'http://127.0.0.1:8000'
    // }

    return `${window.location.protocol}//${window.location.hostname}:8000`
}
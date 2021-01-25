
const https = require('https');

export class SendPk{
    constructor(){}

    sendOTP(OTP: number, receiverMobile: string){
        try{
        let username = 923136604801;
         let password = 'sendpk@1991'
         let mobile = parseInt(receiverMobile);
         let message = 'Your Kellostore Activation OTP Code: '+OTP;
      
          let url = `https://sendpk.com/api/sms.php?username=${username}&password=${password}&sender=BrandName&mobile=${mobile}&message=${message}`
          https.get(url, function (response: any) {  
            response.setEncoding('utf8')  
            response.on('data', console.log)  
            response.on('error', console.error)  
          });
        }catch(ex){
            console.error('send otp sms exception', ex);
        }
    }
}
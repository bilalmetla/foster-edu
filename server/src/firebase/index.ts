
  const firebase = require("firebase-admin");
  //const serviceAccount = require('./kello-414db-firebase-adminsdk-oqpmj-c6ccf08fda.json');
  //const serviceAccount = require('kellostore_secret.json');
  const serviceAccount = {
    "type": "service_account",
    "project_id": "kellostore",
    "private_key_id": "063fa281222d219f703734b38cd29e3cc048d3ed",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRF8GAzWLX74cr\nf4jdZkbBR4k/y6+2sjAA/eAISdRvIs0VpmyvIi48v4Yi0L9kgJsAELhc35AhzCE4\ny2+0JBqp8l7ehese6dX4LsBAuEB8Qo2Dv0SDD5s5iT1HgxGeymD5NK7K3FK31TFX\nkv7rjCBIAxPxhRJX2udVPmM8JNAHxhlJwHqZOxfjkc0BAojQMG5YVU0hRpWTAvcx\npmtVw9aotbErf/APi1CpL+rGoYY1kR3Kc1eT0sDXQjj2aDCmQR+jTWm54uhwNLsf\nyJrxAyOF5Suh2+RD/njuMpgJhkoYs0d7+Sg1dNJQhZSG/7TKwZNkMPEoI0a+Md5e\nkgiWwxBbAgMBAAECggEAJRJlzawsqjG4XsPaS397ap0Fk3hOsCZ9H3O+jz+V+MNy\nlSqNsH3SRJFHC5Q8osg9UlnzUT+KCyimAGXyZ5ul+HBGDyM2fRKQKjZ/xsmNKHK0\nx8nSDo6pQZ0wPBpgIStidaohUxHSTMg7MD4Nxk9qXBv1N4uhsTLsUpp7Ln3VbXas\ntwDRHIg+nS0ggCiz0Va6bHrritNx5gE26x3EkByPCvGyBCpmytDtN2zuxe4QZ5LI\nd9eZEYLAezz2xgkxAWnHb9TmXiQWIlZYUMnob/p9PcZEQkeW7hxBMQnsj7lhUnfI\nbZne3Y5peeIhQHGObPfHjhYfZpmC8U5nBOcE/nvY4QKBgQDDCjTADGqFBZbr2/CX\nlO3c99mexM+YHBtZ27oHSNZyQy2PrTIlacAhUDzQQq1OEwb/Vkd7Mqudk0T7G3i8\nllHQib+WRcc+UeQuVb/HWQWGThQtnPPcIx86KHSnEssXBa/gc3lOCNP1edgtoDUf\npmtHf6yljAldh+Oqr0J7pSAWSwKBgQC+cR39GBGrG5CKQgXRtOos6lDX5yi4EJBt\nbs1QnwDxf54KEvWcNtYtN47bLcMMKA5A9wGbFQk0JNM+sjFn4jYUgZ2CMkkglGxs\n8SNdAVuSXALM75TsFEl+QnX8b26a7dDM4IBF7xbfEO5jyg10dpGjFT66EiRvrJWn\nWap8bMzkMQKBgEDdkBWfC34aEct3ZljDayhmNbYb9n68Okx0SzZI/ykZNnnmPBs9\nRGzP5qnMwx6ILXeWFkfe3jyV0gdBZ7IwvB0C8vjjVBRh3+WZFyMRdEjqhsN0w5Wf\nCK+q7MDz+x85APlA7kMJpJSrZT4nXgOcsWkiCSU1oZe9rfYCO7YrgLRpAoGBALAV\nfxjpDE0da4OqkB7aHDvzW1SFk4y9JA1LCeOlYQXqbYH7DcWmnlmoqRnXMiUnVCaV\nPJLb3GquMfQiZrQa4M4NGkmrnRnWonoIbB4uhzDIin5ad2PhTiLD6LvDfI0bnpgQ\nbAo9ivQtf34c8Fvi1b3ogtsgszfeZ3EY4x2wq7HBAoGAMfy1+j+7J8oY+udlrCUA\nLSURRIWQXPG1tvfmNOtAZvW2A4vI53vXOcBLeGC0VC1VGYFZDtZaw5tursGrnkec\nLxjNdccNknlIkKk5sUzrFV9YsTJPBWWMIHIuRsCMTH26HNHdENL9OndKNpjYErv0\nOf7tAM0DNDY4yy9s29yjajY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6ip06@kellostore.iam.gserviceaccount.com",
    "client_id": "113845040722045254397",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6ip06%40kellostore.iam.gserviceaccount.com"
  }

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),            
    //databaseURL: "https://your-app-name.firebaseio.com"
    
  });

  /**
   * Message options 
   *   type MessagingOptions = {
	
    dryRun?: boolean;
	
    priority?: string; // normal or high
	
    timeToLive?: number; // in second
	
    collapseKey?: string;
	
    mutableContent?: boolean;
	
    contentAvailable?: boolean;
	
    restrictedPackageName?: string;
	
    [key: string]: any | undefined;
	
  };
   */
export class Firebase {

    constructor(){
       
    }

    /**
     * 
     * @param payload = {
        data: {
          score: '850',
          time: '2:45'
        }
      };

     * @param deviceToken 
     */
    sendNotification(deviceToken: string, payload: object){
        const options = {
            priority: 'normal',            
            timeToLive: 60 * 60 * 24, // 1 day
            sound: "default",
            
          };
          
        firebase
        .messaging()
        .sendToDevice(deviceToken, payload, options)
        .then((response: any) => {
            // Response is a message ID string.
            console.log(`sendNotification to ${deviceToken} | Successfully sent message:`, response);
          })
          .catch((error: any) => {
            console.error(`sendNotification to ${deviceToken} | Error sending message:`, error);
          });
        
    }

    sendNotificationToMany(registrationTokens: any, payload: any){
        payload.tokens = registrationTokens;
        firebase.messaging().sendMulticast(payload)
        .then((response: any) => {
            if (response.failureCount > 0) {
            const failedTokens: any = [];
            response.responses.forEach((resp: any, idx: number) => {
                if (!resp.success) {
                failedTokens.push(registrationTokens[idx]);
                }
            });
            console.log('sendNotificationToMany | List of tokens that caused failures: ' + failedTokens);
            }
        })
        .catch((error: any) => {
            console.error('sendNotificationToMany | Error sending message:', error);
          });


    }
}
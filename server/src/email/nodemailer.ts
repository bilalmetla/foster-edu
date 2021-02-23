import * as nodemailer from 'nodemailer'; 
 
export class GMailService { 
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport( 
      //`smtps://info%40thefoster.life:Safarifone@smtp.gmail.com` 
      `smtps://info%40thefoster.life:Thefoster@1991@smtp.ionos.com` 
    ); 
  } 
  sendMail(to: string, subject: string, content: string) { 
    let options = { 
      from: 'info@thefoster.life', 
      to: to, 
      subject: subject, 
      text: content ,
     // html: html, // html body

    } 

    this._transporter.sendMail(  
      options, (error, info) => { 
        if (error) { 
          return console.log(`error: ${error}`); 
        } 
        console.log(`Message Sent ${info.response}`); 
      }); 
  } 
} 

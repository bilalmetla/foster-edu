import * as nodemailer from 'nodemailer'; 
 
export class GMailService { 
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport( 
      `smtps://webapp992%40gmail.com:Safarifone@smtp.gmail.com` 
    ); 
  } 
  sendMail(to: string, subject: string, content: string) { 
    let options = { 
      from: 'info@foster.com', 
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

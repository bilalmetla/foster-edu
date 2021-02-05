import {Kello} from './application';
import {ApplicationConfig} from '@loopback/core';
import { winstonLogger as logger } from "./logger";



export {Kello};

export async function main(options: ApplicationConfig = {}) {
  const app = new Kello(options);
  await app.boot();
  await app.start();

//  app.io = require('socket.io')(await app.start());
//  app.io.on('connection', async function (socket: any) {

//   logger.info('connected', socket.id)
//       socket.on('disconnect', function () {
//         logger.info('user disconnected');
//       });
//   });

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  logger.info(`Server is running at ${url}`);
  logger.info(`Try ${url}/ping`);

  return app;
}

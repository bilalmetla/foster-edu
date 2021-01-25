import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, repository} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { AuthenticationBindings } from '@loopback/authentication';
import { MyAuthMetadataProvider, MyAuthAuthenticationStrategyProvider, MyAuthActionProvider, MyAuthBindings } from './auth';
import { winstonLogger as logger } from "./logger";
import {ConfigurationsRepository} from './repositories';

export class Kello extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    process.env.requests = '0';
    process.env.homePage = '0';
    process.env.productPage = '0';//
    process.env.successResponses = '0';
    process.env.errorResponses = '0';
    process.env.lastResponseTime = '0';
    process.env.avgResponseTime = '0';
    process.env.kelloConfigs = '';
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    
    this.static('/shopping', path.join(__dirname, '../public/customer_client'));
    this.static('/customer_client/assets', path.join(__dirname, '../public/customer_client/customer_client/assets'));
    this.static('/customer_client/runtime.js', path.join(__dirname, '../public/customer_client/runtime.js'));
    this.static('/customer_client/polyfills.js', path.join(__dirname, '../public/customer_client/polyfills.js'));
    this.static('/customer_client/styles.js', path.join(__dirname, '../public/customer_client/styles.js'));
    this.static('/customer_client/vendor.js', path.join(__dirname, '../public/customer_client/vendor.js'));
    this.static('/customer_client/vendor.js', path.join(__dirname, '../public/admin_client/vendor.js'));
    this.static('/customer_client/main.js', path.join(__dirname, '../public/customer_client/main.js'));

    this.static('/app', path.join(__dirname, '../public/admin_client'));
    this.static('/assets', path.join(__dirname, '../public/admin_client/assets'));
    this.static('/runtime.js', path.join(__dirname, '../public/admin_client/runtime.js'));
    this.static('/polyfills.js', path.join(__dirname, '../public/admin_client/polyfills.js'));
    this.static('/styles.js', path.join(__dirname, '../public/admin_client/styles.js'));
    this.static('/vendor.js', path.join(__dirname, '../public/admin_client/vendor.js'));
    this.static('/vendor.js', path.join(__dirname, '../public/admin_client/vendor.js'));
    this.static('/main.js', path.join(__dirname, '../public/admin_client/main.js'));

    this.static('/products/images', path.join(__dirname, '../public/products/images'));
    this.static('/promotions/images', path.join(__dirname, '../public/promotions/images'));

    // Customize @loopback/rest-explorer configuration here
    // this.bind(RestExplorerBindings.CONFIG).to({
    //   path: '/explorer',
    // });
    // this.configure(RestExplorerBindings.COMPONENT).to({
    //   path: '/explorer',
    // });
    
    this.component(RestExplorerComponent);
    //this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.METADATA).toProvider(MyAuthMetadataProvider);
    this.bind(MyAuthBindings.STRATEGY).toProvider(MyAuthAuthenticationStrategyProvider);
    this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(MyAuthActionProvider);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

//@repository(ConfigurationsRepository)
  // let configurationsRepository : ConfigurationsRepository;
  //   async ()=>{
  //     const configurations = await configurationsRepository.find();
  //     let configuration = JSON.stringify(configurations[0])
  //     logger.debug(`configuration loaded .. ${configuration} `);
  //     process.env.kelloConfigs = configuration;
  //   }


  }
}

setInterval(()=>{
  console.log(`
  total requests: ${process.env.requests}
  total success responses: ${process.env.successResponses}
  total error responses: ${process.env.errorResponses}
  last response time: ${process.env.lastResponseTime} ms
  avg response time: ${process.env.avgResponseTime} ms
  total home page: ${process.env.homePage}
  total product page: ${process.env.productPage}
  `);
  logger.info(`
  total requests: ${process.env.requests}
  total success responses: ${process.env.successResponses}
  total error responses: ${process.env.errorResponses}
  last response time: ${process.env.lastResponseTime} ms
  avg response time: ${process.env.avgResponseTime} ms
  total home page: ${process.env.homePage}
  total product page: ${process.env.productPage}
  `);

}, 1000*10);


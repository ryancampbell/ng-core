// polyfills have to be first
import 'angular2-universal-polyfills';
import * as express from 'express';
import * as path from 'path';
import * as compression from 'compression';
import { createEngine, ExpressEngineConfig } from 'angular2-express-engine';

// Angular 2
import { enableProdMode } from '@angular/core';

import { BizConfig } from './config';

const ROOT = process.cwd();

export class BizServer {

  public app: any;
  public server: any;

  // ========================================
  // constructor
  // ========================================

  public constructor(private config: BizConfig) {
    this.init();
  }

  // ========================================
  // public methods
  // ========================================

  public start(): BizServer {
    this.server = this.app.listen(process.env.PORT || 8888, () => {
      console.log(`Listening on: http://localhost:${this.server.address().port}`);
    });

    return this;
  }

  // ========================================
  // private methods
  // ========================================

  private init(): void {
    this.app = express();

    // 1. set up Angular Universal to be the rendering engine for Express
    this.app.engine('.html', createEngine({}));
    this.app.set('views', path.join(process.cwd(), 'dist'));
    this.app.set('view engine', 'html');

    this.app.get('*', function(req, res, next) {
      // http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/TerminologyandKeyConcepts.html#x-forwarded-proto
      if (req.get('x-forwarded-proto') && req.get('x-forwarded-proto') != "https") {
        res.set('x-forwarded-proto', 'https');

        if (req.get('host').split('.')[0] !== 'www') {
          res.redirect('https://www.' + req.get('host') + req.url);
        } else {
          res.redirect('https://' + req.get('host') + req.url);
        }

      } else {
        next();
      }
    });

    // Serve static files
    this.app.use('/client', compression());
    this.app.use('/client', express.static(path.join(ROOT, 'dist', 'client')));
    this.app.use('/public', compression());
    this.app.use('/public', express.static(path.join(ROOT, 'public')));
    this.app.use(express.static(path.join(ROOT, 'public'), {index: false})); // public

    // enable prod for faster renders
    enableProdMode();

    //this.app.use('/api', require('./api/index.js'));

    /*this.app.get(['/results', '/results/*'], ngPage(ResultsAppModule, 'results/index', '/results/'));
    this.app.get(['/upload', '/upload/*'], ngPage(UploadAppModule, 'upload/index', '/upload/'));*/

    this.app.get('/', ngPage(this.config.apps['root'], 'index', '/'));

    function ngPage(module: any, htmlPath: string, baseUrl: string): any {
      return (req, res) => {
        // Our Universal - express configuration object
        const expressConfig : ExpressEngineConfig = {
          req,
          res,
          ngModule: module,
          // preboot: false,
          baseUrl: baseUrl,

          requestUrl: req.originalUrl,
          originUrl: 'http://localhost:8888'
        };

        // NOTE: everything passed in here will be set as properties to the top level Zone
        // access these values in your code like this: Zone.current.get('req');
        // this is temporary; we will have a non-Zone way of getting these soon
        res.render(htmlPath, expressConfig);
      };
    }
  }
} 
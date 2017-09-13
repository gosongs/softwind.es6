import express from 'express';
import path from 'path';
import logger from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import routes from './index.route';
import apis from '../api/index.api';
import cors from 'cors';

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// 允许跨域访问
app.use(cors())

// Routes
app.use('/', routes);
app.use('/api', apis);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('admin/error', {
      message: err.message
    });
});

export default app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const hpp = require('hpp');
const { logger } = require('./utils/logger');
require('dotenv').config();
const mainRoute = require('./routes/main.route');
const authRoute = require('./routes/auth.route');
const categoryRoute = require('./routes/category.route');
const postRoute = require('./routes/post.route');

const app = express();

app.disable('x-powered-by'); // disable x-powered-by header
app.set('trust proxy', 1); // trust first proxy

app.use(cors()); // enable CORS
app.use(helmet()); // protect against well known vulnerabilities
app.use(cookieParser()); // parse cookie header
app.use(morgan('dev')); // log HTTP requests
app.use(hpp()); // protect against HTTP Parameter
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse URL encoded body

const baseUrl = process.env.BASE_URL || '/api/v1';

app.use(baseUrl, mainRoute);
app.use(`${baseUrl}/auth`, authRoute);
app.use(`${baseUrl}/category`, categoryRoute);
app.use(`${baseUrl}/post`, postRoute);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';

app.listen(port, () => {
  logger().info(
    `System is up & running at port:[${port}] in [${env}] mode with base-url:[${baseUrl}]`
  );
});

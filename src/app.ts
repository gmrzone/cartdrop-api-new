import express, { Application } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import database from './config/db/index';
import { CORS_OPTIONS } from './config/constants';
import userRoutes from './routes/user';
import categoryRoute from './routes/categories';
import subcategoryRoutes from './routes/subcategories';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { AugmentedRequest } from 'express-rate-limit';
import { intervalToDuration } from 'date-fns';

const swaggerDocument = YAML.load('./docs/cartdrop.yml');
const app: Application = express();

// TODO : Remove express-rate-limit dependency and implement request rate limit middleware using redis
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 'error',
  },
  handler: (request, response, next, options) => {
    const {
      rateLimit: { resetTime },
    } = request as AugmentedRequest;
    let formatedDate = '';
    if (resetTime) {
      const intervalObj = intervalToDuration({
        start: resetTime,
        end: new Date(),
      });
      if (intervalObj.years) {
        formatedDate += `${intervalObj.years} Year${
          intervalObj.years > 1 && 's'
        }, `;
      }
      if (intervalObj.months) {
        formatedDate += `${intervalObj.months} Month${
          intervalObj.months > 1 && 's'
        }, `;
      }
      if (intervalObj.days) {
        formatedDate += `${intervalObj.days} Days${
          intervalObj.days > 1 && 's'
        }, `;
      }
      if (intervalObj.hours) {
        formatedDate += `${intervalObj.hours} Hour${
          intervalObj.hours > 1 && 's'
        }, `;
      }
      if (intervalObj.minutes) {
        formatedDate += `${intervalObj.minutes} Min${
          intervalObj.minutes > 1 && 's'
        }, `;
      }
      if (intervalObj.seconds) {
        formatedDate += `${intervalObj.seconds} Sec${
          intervalObj.seconds > 1 && 's'
        }, `;
      }
    }
    const updatedMessage = {
      ...options.message,
      message: `You have made too many requests, please try again after ${formatedDate}.`,
    };
    response.status(options.statusCode).send(updatedMessage);
  },
  skipFailedRequests: true,
});
database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoute);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.log('info', 'Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.emerg('NO ENV DEFINED');
}

export interface Config {
  express: {
    port: number;
  };
}

export default {
  express: {
    port: process.env.EXPRESS_PORT || 3000,
  },
} as Config;

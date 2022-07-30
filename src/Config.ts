import * as dotenv from 'dotenv';
dotenv.config();

declare var process: {
  env: {
    TOKEN: string,
  }
}

const ENV = {
  TOKEN: process.env.TOKEN
}

export default ENV;

import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public CLIENT_URL: string | undefined;
  public NODE_ENV: string | undefined;
  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/socialApp-backend';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || ''
  }

  public createLogger(): any {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.Console()],
      });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

}

export const config: Config = new Config();
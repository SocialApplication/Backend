import { authService } from '@global/services/db/auth.service';
import { config } from '@root/config';
import {DoneCallback, Job} from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('auth worker');

class AuthWorker {
  async addAuthUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const {value} = job.data;
      await authService.createAuthUser(value);
      //add method to send data to database
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const authWorker: AuthWorker = new AuthWorker();

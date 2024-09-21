import { userService } from '@global/services/db/user.service';
import { config } from '@root/config';
import {DoneCallback, Job} from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('user worker');

class UserWorker {
  async addUserToDb(job: Job, done: DoneCallback): Promise<void>{
    try {
      const {value} = job.data;
      await userService.addUserData(value);
      //add method to send data to database
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();

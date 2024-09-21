import { IAuthJob } from '@root/features/auth/interfaces/auth.interface';
import { BaseQueue } from './base.queue';
import { userWorker } from '@global/workers/user.worker';


class UserQueue extends BaseQueue{
  constructor(){
    super('user');
    this.processJob('addUserJob', 5, userWorker.addUserToDb);
  }

  public addUserJob(name: string, data: IAuthJob): void{
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();

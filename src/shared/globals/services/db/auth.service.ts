import { Helpers } from '@global/helpers/helper';
import { IAuthDocument } from '@root/features/auth/interfaces/auth.interface';
import { AuthModel } from '@root/features/auth/models/auth.schema';

class AuthService {

  public async createAuthUser(data: IAuthDocument):Promise<void> {
    await AuthModel.create(data);
  }


  public async getUserByUserNameOrEmail(username: string, email: string): Promise<IAuthDocument>{
    const query = {
      $or :[ {username : Helpers.firstLetterUppercase(username)}, {email: Helpers.lowerCase(email)}]
    };
    const user: IAuthDocument = await AuthModel.findOne(query).exec() as IAuthDocument;
    return user;
  }
}

export const authService: AuthService = new AuthService();

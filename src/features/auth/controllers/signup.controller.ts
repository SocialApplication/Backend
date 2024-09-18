import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { Request, Response } from 'express';
import {ObjectId} from 'mongodb';
import { signupSchema } from '../schemes/signup';
import { IAuthDocument, ISignUpData } from '../interfaces/auth.interface';
import { authService } from '@global/services/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helper';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';

export class Signup {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response){
    const {username, email, password, avatarColor, avatarImage} = req.body;
    const checkIfUserExit: IAuthDocument = await authService.getUserByUserNameOrEmail(username, email);
    if(checkIfUserExit){
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authData : IAuthDocument = Signup.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const result: UploadApiResponse = await uploads(avatarImage, `${userObjectId}`, true, true) as UploadApiResponse;
    if(!result?.public_id){
      throw new BadRequestError('File upload Error occured. Try again');
    }

    return res.status(HTTP_STATUS.CREATED).json({message: 'User created successfully', authData });

  }

  private signupData(data: ISignUpData): IAuthDocument{
    const {_id, username, email, uId, password, avatarColor} = data;

    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;

  }
}

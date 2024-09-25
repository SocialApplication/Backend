import express, { Router } from 'express';
import { Signup } from '../controllers/signup.controller';
import { SignIn } from '../controllers/signin.controller';
import { SignOut } from '../controllers/signout.controller';


class AuthRoutes{
  private router: Router;

  constructor(){
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', Signup.prototype.create);
    this.router.post('/signin', SignIn.prototype.read);
    return this.router;

  }

  public signoutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes;

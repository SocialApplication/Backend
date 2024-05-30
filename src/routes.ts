import { Express } from 'express';
import { healthRoutes } from './features/user/healthRoutes';

// const BASE_PATH = '/api/v1';

export default (app: Express) => {
  const routes = () => {
    app.use('', healthRoutes.health());
    app.use('', healthRoutes.env());
    app.use('', healthRoutes.fiboRoutes());
  };
  routes();
};

import { Express } from 'express';
import { healthRoutes } from './features/healthRoutes';
import { authRoutes } from './features/auth/routes/authRoutes';

const BASE_PATH = '/api/v1';

export default (app: Express) => {
  const routes = () => {
    app.use('', healthRoutes.health());
    app.use(BASE_PATH, authRoutes.routes());
  };
  routes();
};

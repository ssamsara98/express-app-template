import { Router } from 'express';
import { cityController } from '~/controllers/dvdrental/city.controller';

export const cityRoutes = Router();

cityRoutes.get('/', cityController.getCityList);
cityRoutes.get('/id/:cityId', cityController.getCity);

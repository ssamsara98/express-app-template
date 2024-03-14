import { Router } from 'express';
import { storeController } from '~/controllers/dvdrental/store.controller';

export const storeRoutes = Router();

storeRoutes.get('/', storeController.getStoreList);
storeRoutes.get('/id/:storeId', storeController.getStore);

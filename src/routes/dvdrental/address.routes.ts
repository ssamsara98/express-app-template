import { Router } from 'express';
import { addressController } from '~/controllers/dvdrental/address.controller';

export const addressRoutes = Router();

addressRoutes.get('/', addressController.getAddressList);
addressRoutes.get('/id/:addressId', addressController.getAddress);

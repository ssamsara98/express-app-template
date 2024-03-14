import { Router } from 'express';
import { customerController } from '~/controllers/dvdrental/customer.controller';

export const customerRoutes = Router();

customerRoutes.get('/', customerController.getCustomerList);
customerRoutes.get('/id/:customerId', customerController.getCustomer);

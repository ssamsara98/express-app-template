import { Router } from 'express';
import { paymentController } from '~/controllers/dvdrental/payment.controller';

export const paymentRoutes = Router();

paymentRoutes.get('/', paymentController.getPaymentList);
paymentRoutes.get('/id/:paymentId', paymentController.getPayment);

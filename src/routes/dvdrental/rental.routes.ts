import { Router } from 'express';
import { rentalController } from '~/controllers/dvdrental/rental.controller';

export const rentalRoutes = Router();

rentalRoutes.get('/', rentalController.getRentalList);
rentalRoutes.get('/id/:rentalId', rentalController.getRental);

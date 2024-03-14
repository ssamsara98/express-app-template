import { Router } from 'express';
import { countryController } from '~/controllers/dvdrental/country.controller';

export const countryRoutes = Router();

countryRoutes.get('/', countryController.getCountryList);
countryRoutes.get('/id/:countryId', countryController.getCountry);

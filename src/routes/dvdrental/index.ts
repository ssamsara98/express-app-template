import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { actorRoutes } from './actor.routes';
import { addressRoutes } from './address.routes';
import { categoryRoutes } from './category.routes';
import { cityRoutes } from './city.routes';
import { countryRoutes } from './country.routes';
import { customerRoutes } from './customer.routes';
import { filmRoutes } from './film.routes';
import { filmActorRoutes } from './film-actor.routes';
import { filmCategoryRoutes } from './film-category.routes';
import { inventoryRoutes } from './inventory.routes';
import { languageRoutes } from './language.routes';
import { paymentRoutes } from './payment.routes';
import { rentalRoutes } from './rental.routes';
import { staffRoutes } from './staff.routes';
import { storeRoutes } from './store.routes';

export const dvdrentalRoutes = Router();

dvdrentalRoutes.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    res.json({ message: 'welcome to dvdrental' });
  }),
);

dvdrentalRoutes.use('/actor', actorRoutes);
dvdrentalRoutes.use('/address', addressRoutes);
dvdrentalRoutes.use('/category', categoryRoutes);
dvdrentalRoutes.use('/city', cityRoutes);
dvdrentalRoutes.use('/country', countryRoutes);
dvdrentalRoutes.use('/customer', customerRoutes);
dvdrentalRoutes.use('/film', filmRoutes);
dvdrentalRoutes.use('/film-actor', filmActorRoutes);
dvdrentalRoutes.use('/film-category', filmCategoryRoutes);
dvdrentalRoutes.use('/inventory', inventoryRoutes);
dvdrentalRoutes.use('/language', languageRoutes);
dvdrentalRoutes.use('/payment', paymentRoutes);
dvdrentalRoutes.use('/rental', rentalRoutes);
dvdrentalRoutes.use('/staff', staffRoutes);
dvdrentalRoutes.use('/store', storeRoutes);

import { Router } from 'express';
import { filmActorController } from '~/controllers/dvdrental/film-actor.controller';

export const filmActorRoutes = Router();

filmActorRoutes.get('/', filmActorController.getFilmActorList);
filmActorRoutes.get('/id/:filmActorId', filmActorController.getFilmActor);

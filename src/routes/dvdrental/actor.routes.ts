import { Router } from 'express';
import { actorController } from '~/controllers/dvdrental/actor.controller';

export const actorRoutes = Router();

actorRoutes.get('/', actorController.getActorList);
actorRoutes.get('/id/:actorId', actorController.getActor);

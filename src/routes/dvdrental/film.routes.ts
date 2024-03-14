import { Router } from 'express';
import { filmController } from '~/controllers/dvdrental/film.controller';

export const filmRoutes = Router();

filmRoutes.get('/', filmController.getFilmList);
filmRoutes.get('/id/:filmId', filmController.getFilm);
filmRoutes.get('/raw', filmController.getFilmListRaw);
filmRoutes.get('/raw/id/:filmId', filmController.getFilmRaw);

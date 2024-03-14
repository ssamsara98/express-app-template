import { Router } from 'express';
import { filmCategoryController } from '~/controllers/dvdrental/film-category.controller';

export const filmCategoryRoutes = Router();

filmCategoryRoutes.get('/', filmCategoryController.getFilmCategoryList);
filmCategoryRoutes.get('/id/:filmCategoryId', filmCategoryController.getFilmCategory);

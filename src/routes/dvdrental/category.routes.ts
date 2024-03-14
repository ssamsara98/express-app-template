import { Router } from 'express';
import { categoryController } from '~/controllers/dvdrental/category.controller';

export const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.getCategoryList);
categoryRoutes.get('/id/:categoryId', categoryController.getCategory);

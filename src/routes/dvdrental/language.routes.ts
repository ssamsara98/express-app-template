import { Router } from 'express';
import { languageController } from '~/controllers/dvdrental/language.controller';

export const languageRoutes = Router();

languageRoutes.get('/', languageController.getLanguageList);
languageRoutes.get('/id/:languageId', languageController.getLanguage);

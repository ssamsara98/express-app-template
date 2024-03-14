import { Router } from 'express';
import { staffController } from '~/controllers/dvdrental/staff.controller';

export const staffRoutes = Router();

staffRoutes.get('/', staffController.getStaffList);
staffRoutes.get('/id/:staffId', staffController.getStaff);

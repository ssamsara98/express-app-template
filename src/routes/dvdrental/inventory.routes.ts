import { Router } from 'express';
import { inventoryController } from '~/controllers/dvdrental/inventory.controller';

export const inventoryRoutes = Router();

inventoryRoutes.get('/', inventoryController.getInventoryList);
inventoryRoutes.get('/id/:inventoryId', inventoryController.getInventory);

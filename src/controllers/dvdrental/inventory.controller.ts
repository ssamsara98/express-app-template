import expressAsyncHandler from 'express-async-handler';
import { InventoryService, inventoryService } from '~/services/dvdrental/inventory.service';
import { successJson } from '~/utils/response';

export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  getInventoryList = expressAsyncHandler(async (req, res) => {
    const inventoryList = await this.inventoryService.getInventoryList();
    res.json(successJson(inventoryList));
  });

  getInventory = expressAsyncHandler<{ inventoryId: number }>(async (req, res) => {
    const inventory = await this.inventoryService.getInventory(req.params.inventoryId);
    res.json(successJson(inventory));
  });
}

export const inventoryController = new InventoryController(inventoryService);

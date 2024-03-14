import { db } from '~/models';

export class InventoryService {
  constructor(private readonly database: typeof db) {}

  async getInventoryList() {
    const inventoryList = await this.database.Inventory.findAll();
    return inventoryList;
  }

  async getInventory(inventoryId: number) {
    const inventory = await this.database.Inventory.findByPk(inventoryId, {
      include: [
        {
          model: this.database.Film,
        },
        {
          model: this.database.Store,
        },
        {
          model: this.database.Rental,
        },
      ],
    });
    return inventory;
  }
}

export const inventoryService = new InventoryService(db);

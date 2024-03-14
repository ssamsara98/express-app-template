import { db } from '~/models';

export class StoreService {
  constructor(private readonly database: typeof db) {}

  async getStoreList() {
    const storeList = await this.database.Store.findAll();
    return storeList;
  }

  async getStore(storeId: number) {
    const store = await this.database.Store.findByPk(storeId, {
      include: [
        {
          model: this.database.Staff,
        },
        {
          model: this.database.Address,
        },
        {
          model: this.database.Staff,
          as: 'staffs',
        },
      ],
    });
    return store;
  }
}

export const storeService = new StoreService(db);

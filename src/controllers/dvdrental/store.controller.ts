import expressAsyncHandler from 'express-async-handler';
import { StoreService, storeService } from '~/services/dvdrental/store.service';
import { successJson } from '~/utils/response';

export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  getStoreList = expressAsyncHandler(async (req, res) => {
    const storeList = await this.storeService.getStoreList();
    res.json(successJson(storeList));
  });

  getStore = expressAsyncHandler<{ storeId: number }>(async (req, res) => {
    const store = await this.storeService.getStore(req.params.storeId);
    res.json(successJson(store));
  });
}

export const storeController = new StoreController(storeService);

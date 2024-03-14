import expressAsyncHandler from 'express-async-handler';
import { CityService, cityService } from '~/services/dvdrental/city.service';
import { successJson } from '~/utils/response';

export class CityController {
  constructor(private readonly cityService: CityService) {}

  getCityList = expressAsyncHandler(async (req, res) => {
    const cityList = await this.cityService.getCityList();
    res.json(successJson(cityList));
  });

  getCity = expressAsyncHandler<{ cityId: number }>(async (req, res) => {
    const city = await this.cityService.getCity(req.params.cityId);
    res.json(successJson(city));
  });
}

export const cityController = new CityController(cityService);

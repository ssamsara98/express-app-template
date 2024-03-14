import expressAsyncHandler from 'express-async-handler';
import { CountryService, countryService } from '~/services/dvdrental/country.service';
import { successJson } from '~/utils/response';

export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  getCountryList = expressAsyncHandler(async (req, res) => {
    const countryList = await this.countryService.getCountryList();
    res.json(successJson(countryList));
  });

  getCountry = expressAsyncHandler<{ countryId: number }>(async (req, res) => {
    const country = await this.countryService.getCountry(req.params.countryId);
    res.json(successJson(country));
  });
}

export const countryController = new CountryController(countryService);

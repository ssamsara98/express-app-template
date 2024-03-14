import { db } from '~/models';

export class CountryService {
  constructor(private readonly database: typeof db) {}

  async getCountryList() {
    const countryList = await this.database.Country.findAll();
    return countryList;
  }

  async getCountry(cityId: number) {
    const country = await this.database.Country.findByPk(cityId, {
      include: [
        {
          model: this.database.City,
        },
      ],
    });
    return country;
  }
}

export const countryService = new CountryService(db);

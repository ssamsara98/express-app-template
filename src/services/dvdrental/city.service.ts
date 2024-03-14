import { db } from '~/models';

export class CityService {
  constructor(private readonly database: typeof db) {}

  async getCityList() {
    const cityList = await this.database.City.findAll();
    return cityList;
  }

  async getCity(cityId: number) {
    const city = await this.database.City.findByPk(cityId, {
      include: [
        {
          model: this.database.Country,
        },
        {
          model: this.database.Address,
        },
      ],
    });
    return city;
  }
}

export const cityService = new CityService(db);

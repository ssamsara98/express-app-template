import { db } from '~/models';

export class AddressService {
  constructor(private readonly database: typeof db) {}

  async getAddressList() {
    const addressList = this.database.Address.findAll();
    return addressList;
  }

  async getAddress(addressId: number) {
    const address = this.database.Address.findByPk(addressId, {
      include: [
        {
          model: this.database.City,
        },
        {
          model: this.database.Store,
        },
        {
          model: this.database.Customer,
        },
        {
          model: this.database.Staff,
        },
      ],
    });
    return address;
  }
}

export const addressService = new AddressService(db);

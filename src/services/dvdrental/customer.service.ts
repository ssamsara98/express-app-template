import { db } from '~/models';

export class CustomerService {
  constructor(private readonly database: typeof db) {}

  async getCustomerList() {
    const customerList = await this.database.Customer.findAll();
    return customerList;
  }

  async getCustomer(customerId: number) {
    const customer = await this.database.Customer.findByPk(customerId, {
      include: [
        {
          model: this.database.Address,
        },
        {
          model: this.database.Store,
        },
        {
          model: this.database.Rental,
        },
        {
          model: this.database.Payment,
        },
      ],
    });
    return customer;
  }
}

export const customerService = new CustomerService(db);

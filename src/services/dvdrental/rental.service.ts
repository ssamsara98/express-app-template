import { db } from '~/models';

export class RentalService {
  constructor(private readonly database: typeof db) {}

  async getRentalList() {
    const rentalList = await this.database.Rental.findAll();
    return rentalList;
  }

  async getRental(rentalId: number) {
    const rental = await this.database.Rental.findByPk(rentalId, {
      include: [
        {
          model: this.database.Inventory,
        },
        {
          model: this.database.Customer,
        },
        // {
        //   model: this.database.Staff
        // },
        {
          model: this.database.Payment,
        },
      ],
    });
    return rental;
  }
}

export const rentalService = new RentalService(db);

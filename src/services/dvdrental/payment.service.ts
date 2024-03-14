import { db } from '~/models';

export class PaymentService {
  constructor(private readonly database: typeof db) {}

  async getPaymentList() {
    const paymentList = await this.database.Payment.findAll();
    return paymentList;
  }

  async getPayment(paymentId: number) {
    const payment = await this.database.Payment.findByPk(paymentId, {
      include: [
        {
          model: this.database.Customer,
        },
        // {
        //   model: this.database.Staff
        // },
        {
          model: this.database.Rental,
        },
      ],
    });
    return payment;
  }
}

export const paymentService = new PaymentService(db);

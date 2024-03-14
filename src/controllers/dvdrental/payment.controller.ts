import expressAsyncHandler from 'express-async-handler';
import { PaymentService, paymentService } from '~/services/dvdrental/payment.service';
import { successJson } from '~/utils/response';

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  getPaymentList = expressAsyncHandler(async (req, res) => {
    const paymentList = await this.paymentService.getPaymentList();
    res.json(successJson(paymentList));
  });

  getPayment = expressAsyncHandler<{ paymentId: number }>(async (req, res) => {
    const payment = await this.paymentService.getPayment(req.params.paymentId);
    res.json(successJson(payment));
  });
}

export const paymentController = new PaymentController(paymentService);

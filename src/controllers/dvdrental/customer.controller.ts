import expressAsyncHandler from 'express-async-handler';
import { CustomerService, customerService } from '~/services/dvdrental/customer.service';
import { successJson } from '~/utils/response';

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  getCustomerList = expressAsyncHandler(async (req, res) => {
    const customerList = await this.customerService.getCustomerList();
    res.json(successJson(customerList));
  });

  getCustomer = expressAsyncHandler<{ customerId: number }>(async (req, res) => {
    const customer = await this.customerService.getCustomer(req.params.customerId);
    res.json(successJson(customer));
  });
}

export const customerController = new CustomerController(customerService);

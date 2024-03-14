import expressAsyncHandler from 'express-async-handler';
import { AddressService, addressService } from '~/services/dvdrental/address.service';
import { successJson } from '~/utils/response';

export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  getAddressList = expressAsyncHandler(async (req, res) => {
    const addressList = await this.addressService.getAddressList();
    res.json(successJson(addressList));
  });

  getAddress = expressAsyncHandler<{ addressId: number }>(async (req, res) => {
    const address = await this.addressService.getAddress(req.params.addressId);
    res.json(successJson(address));
  });
}

export const addressController = new AddressController(addressService);

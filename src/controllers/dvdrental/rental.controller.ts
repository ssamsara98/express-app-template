import expressAsyncHandler from 'express-async-handler';
import { RentalService, rentalService } from '~/services/dvdrental/rental.service';
import { successJson } from '~/utils/response';

export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  getRentalList = expressAsyncHandler(async (req, res) => {
    const rentalList = await this.rentalService.getRentalList();
    res.json(successJson(rentalList));
  });

  getRental = expressAsyncHandler<{ rentalId: number }>(async (req, res) => {
    const rental = await this.rentalService.getRental(req.params.rentalId);
    res.json(successJson(rental));
  });
}

export const rentalController = new RentalController(rentalService);

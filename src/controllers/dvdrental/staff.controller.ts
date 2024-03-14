import expressAsyncHandler from 'express-async-handler';
import { StaffService, staffService } from '~/services/dvdrental/staff.service';
import { successJson } from '~/utils/response';

export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  getStaffList = expressAsyncHandler(async (req, res) => {
    const staffList = await this.staffService.getStaffList();
    res.json(successJson(staffList));
  });

  getStaff = expressAsyncHandler<{ staffId: number }>(async (req, res) => {
    const staff = await this.staffService.getStaff(req.params.staffId);
    res.json(successJson(staff));
  });
}

export const staffController = new StaffController(staffService);

import { db } from '~/models';

export class StaffService {
  constructor(private readonly database: typeof db) {}

  async getStaffList() {
    const staffList = await this.database.Staff.findAll();
    return staffList;
  }

  async getStaff(staffId: number) {
    const staffList = await this.database.Staff.findByPk(staffId, {
      include: [
        {
          model: this.database.Address,
        },
        {
          model: this.database.Store,
        },
        // {
        //   model: this.database.Payment, // 7292
        // },
        // {
        //   model: this.database.Rental, // 8040
        // },
        {
          model: this.database.Store,
          as: 'stores',
        },
      ],
    });
    return staffList;
  }
}

export const staffService = new StaffService(db);

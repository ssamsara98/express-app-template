import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Staff extends Model<InferAttributes<Staff>, InferCreationAttributes<Staff>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare addressId: number;
  declare email: string;
  declare storeId: number;
  declare active: boolean;
  declare username: string;
  declare password: string;
  declare picture: Buffer;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Address);
    this.belongsTo(models.Store);
    this.hasMany(models.Payment);
    this.hasMany(models.Rental);
    this.hasMany(models.Store, { foreignKey: 'managerStaffId', as: 'stores' });
  }
}

export const staffModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Staff.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'staff_id',
      },
      firstName: {
        type: DT.STRING,
        allowNull: false,
      },
      lastName: {
        type: DT.STRING,
        allowNull: false,
      },
      addressId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
      },
      storeId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      active: {
        type: DT.BOOLEAN,
        allowNull: false,
      },
      username: {
        type: DT.STRING,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
      },
      picture: {
        type: DT.BLOB,
      },
      lastUpdate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'staff',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Staff;
};

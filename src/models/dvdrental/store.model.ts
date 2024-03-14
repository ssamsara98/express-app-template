import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Store extends Model<InferAttributes<Store>, InferCreationAttributes<Store>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare managerStaffId: number;
  declare addressId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Address);
    this.belongsTo(models.Staff, { foreignKey: 'managerStaffId' });
    this.hasMany(models.Staff, { as: 'staffs' });
  }
}

export const storeModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Store.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'store_id',
      },
      managerStaffId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      addressId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      lastUpdate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'store',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Store;
};

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare address: string;
  declare address2: string;
  declare district: string;
  declare cityId: number;
  declare postalCode: string;
  declare phone: string;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.City);
    this.hasMany(models.Staff);
    this.hasMany(models.Store);
    this.hasMany(models.Customer);
  }
}

export const addressModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Address.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'address_id',
      },
      address: {
        type: DT.STRING,
        allowNull: false,
      },
      address2: {
        type: DT.STRING,
      },
      district: {
        type: DT.STRING,
        allowNull: false,
      },
      cityId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      postalCode: {
        type: DT.STRING,
      },
      phone: {
        type: DT.STRING,
        allowNull: false,
      },
      lastUpdate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'address',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Address;
};

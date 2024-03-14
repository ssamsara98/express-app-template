import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare storeId: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare addressId: number;
  declare activebool: boolean;
  declare active: boolean;

  declare createDate?: CreationOptional<Date>;
  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Address);
    this.belongsTo(models.Store);
    this.hasMany(models.Rental);
    this.hasMany(models.Payment);
  }
}

export const customerModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Customer.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'customer_id',
      },
      storeId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DT.STRING,
        allowNull: false,
      },
      lastName: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
      },
      addressId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      activebool: {
        type: DT.BOOLEAN,
        allowNull: false,
      },
      active: {
        type: DT.TINYINT,
      },
      createDate: {
        type: DT.DATEONLY,
        allowNull: false,
      },
      lastUpdate: {
        type: DT.DATE,
      },
    },
    {
      sequelize,
      modelName: 'customer',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Customer;
};

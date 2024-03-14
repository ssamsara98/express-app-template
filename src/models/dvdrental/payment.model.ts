import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare customerId: number;
  declare staffId: number;
  declare rentalId: number;
  declare amount: number;
  declare paymentDate: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Customer);
    this.belongsTo(models.Staff);
    this.belongsTo(models.Rental);
  }
}

export const paymentModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Payment.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'payment_id',
      },
      customerId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      staffId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      rentalId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DT.NUMBER,
        allowNull: false,
      },
      paymentDate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'payment',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Payment;
};

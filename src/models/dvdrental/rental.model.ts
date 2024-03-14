import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Rental extends Model<InferAttributes<Rental>, InferCreationAttributes<Rental>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare rentalDate: Date;
  declare returnDate: Date;
  declare inventoryId: number;
  declare customerId: number;
  declare staffId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Inventory);
    this.belongsTo(models.Customer);
    this.belongsTo(models.Staff);
    this.hasMany(models.Payment);
  }
}

export const rentalModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Rental.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'rental_id',
      },
      rentalDate: {
        type: DT.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DT.DATE,
      },
      inventoryId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      staffId: {
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
      modelName: 'rental',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Rental;
};

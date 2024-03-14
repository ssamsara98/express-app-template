import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Inventory extends Model<
  InferAttributes<Inventory>,
  InferCreationAttributes<Inventory>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare filmId: number;
  declare storeId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Film);
    this.belongsTo(models.Store);
    this.hasMany(models.Rental);
  }
}

export const inventoryModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Inventory.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'inventory_id',
      },
      filmId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      storeId: {
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
      modelName: 'inventory',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Inventory;
};

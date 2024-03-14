import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare city: string;
  declare countryId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Country);
    this.hasMany(models.Address);
  }
}

export const cityModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  City.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'city_id',
      },
      city: {
        type: DT.STRING,
        allowNull: false,
      },
      countryId: {
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
      modelName: 'city',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return City;
};

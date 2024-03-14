import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Country extends Model<InferAttributes<Country>, InferCreationAttributes<Country>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare country: string;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.hasMany(models.City);
  }
}

export const countryModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Country.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'country_id',
      },
      country: {
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
      modelName: 'country',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Country;
};

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Film extends Model<InferAttributes<Film>, InferCreationAttributes<Film>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare releaseYear: number;
  declare languageId: number;
  declare rentalDuration: number;
  declare rentalRate: number;
  declare length: number;
  declare replacementCost: number;
  declare rating: string;
  declare specialFeatures: string;
  declare fulltext: string;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Language);
    this.belongsToMany(models.Category, { through: models.FilmCategory });
    this.belongsToMany(models.Actor, { through: models.FilmActor });
    this.hasMany(models.Inventory);
  }
}

export const filmModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Film.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'film_id',
      },
      title: {
        type: DT.INTEGER,
        allowNull: false,
      },
      description: {
        type: DT.STRING,
      },
      releaseYear: {
        type: DT.INTEGER,
      },
      languageId: {
        type: DT.INTEGER,
        allowNull: false,
      },
      rentalDuration: {
        type: DT.INTEGER,
        allowNull: false,
      },
      rentalRate: {
        type: DT.NUMBER,
        allowNull: false,
      },
      length: {
        type: DT.INTEGER,
      },
      replacementCost: {
        type: DT.NUMBER,
        allowNull: false,
      },
      rating: {
        type: DT.STRING,
      },
      specialFeatures: {
        type: DT.ARRAY(DT.STRING),
      },
      fulltext: {
        type: DT.TSVECTOR,
      },
      lastUpdate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'film',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Film;
};

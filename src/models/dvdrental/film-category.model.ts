import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class FilmCategory extends Model<
  InferAttributes<FilmCategory>,
  InferCreationAttributes<FilmCategory>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare filmId: number;
  declare categoryId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Film);
    this.belongsTo(models.Category);
  }
}

export const filmCategoryModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  FilmCategory.init(
    {
      filmId: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      lastUpdate: {
        type: DT.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'film_category',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return FilmCategory;
};

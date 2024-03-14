import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsToMany(models.Film, { through: models.FilmCategory });
  }
}

export const categoryModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Category.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'category_id',
      },
      name: {
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
      modelName: 'category',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Category;
};

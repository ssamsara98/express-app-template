import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class FilmActor extends Model<
  InferAttributes<FilmActor>,
  InferCreationAttributes<FilmActor>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare filmId: number;
  declare actorId: number;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsTo(models.Film);
    this.belongsTo(models.Actor);
  }
}

export const filmActorModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  FilmActor.init(
    {
      filmId: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      actorId: {
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
      modelName: 'film_actor',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return FilmActor;
};

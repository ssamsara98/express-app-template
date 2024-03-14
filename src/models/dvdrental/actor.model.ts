import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Models } from '..';

export class Actor extends Model<InferAttributes<Actor>, InferCreationAttributes<Actor>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;

  declare lastUpdate?: CreationOptional<Date>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Models) {
    this.belongsToMany(models.Film, { through: models.FilmActor });
  }
}

export const actorModel = (sequelize: Sequelize, DT: typeof DataTypes) => {
  Actor.init(
    {
      id: {
        type: DT.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'actor_id',
      },
      firstName: {
        type: DT.STRING,
        allowNull: false,
      },
      lastName: {
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
      modelName: 'actor',
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Actor;
};

import Sequelize from 'sequelize';
import databaseConfig from '~/config/database.config';
import { Comment, commentModel } from '~/models/comment.model';
import { Post, postModel } from '~/models/post.model';
import { User, userModel } from '~/models/user.model';

const env = process.env.NODE_ENV! || 'development';
const config = databaseConfig[env as keyof typeof databaseConfig];

export const sequelize: Sequelize.Sequelize = config.url
  ? new Sequelize.Sequelize(config.url as string, config)
  : new Sequelize.Sequelize(config.database!, config.username!, config.password, config);

export class Models {
  readonly User!: typeof User;
  readonly Post!: typeof Post;
  readonly Comment!: typeof Comment;

  constructor(user: typeof User, post: typeof Post, comment: typeof Comment) {
    this.User = user;
    this.Post = post;
    this.Comment = comment;
  }
}
export type ModelsKeys = keyof Models;

export const models = new Models(
  userModel(sequelize, Sequelize.DataTypes),
  postModel(sequelize, Sequelize.DataTypes),
  commentModel(sequelize, Sequelize.DataTypes),
);

(Object.keys(models) as Array<ModelsKeys>).forEach((modelName) => {
  if (!!models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export class Sql extends Models {
  readonly sequelize!: Sequelize.Sequelize;
  readonly Sequelize!: typeof Sequelize;

  constructor(models: Models, s: Sequelize.Sequelize, S: typeof Sequelize) {
    super(models.User, models.Post, models.Comment);
    this.sequelize = s;
    this.Sequelize = S;
  }

  async connect() {
    try {
      await sequelize.authenticate();
    } catch (err) {
      console.error('Unable to connect to the SQL database:', err);
      throw err;
    }
  }
}

export const sql = new Sql(models, sequelize, Sequelize);

import mongoose from 'mongoose';

import { debug } from '|/bin/debug';
import { ITodo, TodoModel } from '|/schemas/todo.schema';

export class Schemas {
  readonly Todo!: mongoose.Model<ITodo>;

  constructor(todo: mongoose.Model<ITodo>) {
    this.Todo = todo;
  }
}

export const schemas = new Schemas(TodoModel);

export class MongoDB extends Schemas {
  readonly mongoose!: mongoose.Mongoose;

  constructor(schemas: Schemas, m: typeof mongoose) {
    super(schemas.Todo);
    this.mongoose = m;
  }

  async connect() {
    try {
      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }
      await this.mongoose.connect(process.env.MONGODB_URI!);
      debug('MongoDB Connection has been established successfully.');
    } catch (err) {
      console.error('Unable to connect to the MongoDB:', err);
      if (err && process.env.NODE_ENV !== 'test') {
        const sto = setTimeout(() => {
          this.connect();
          clearTimeout(sto);
        }, 10000);
      }
    }
  }

  async disconnect() {
    try {
      this.mongoose.disconnect();
      debug('MongoDB has been disconnected.');
    } catch (err) {
      console.error('Unable to disconnect to the MongoDB:', err);
      if (err && process.env.NODE_ENV !== 'test') {
        const sto = setTimeout(() => {
          this.disconnect();
          clearTimeout(sto);
        }, 10000);
      }
    }
  }
}

export const mongodb = new MongoDB(schemas, mongoose);

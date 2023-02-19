import { Model, Schema, model, models } from 'mongoose';

class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(collectionName: string, schemaDefinition: Schema) {
    this.schema = schemaDefinition;
    this.model = models[collectionName] || model(collectionName, this.schema);
  }

  // public abstract getAll(): Promise<T[]>;
  
  // public abstract getById(id: string): Promise<T | null>;
  
  // public abstract create(data: T): Promise<T>;
  
  // public abstract update(id: string, data: T): Promise<T | null>;
}

export default AbstractODM;
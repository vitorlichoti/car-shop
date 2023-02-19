import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    super('motorcycles', schema);
  }
  
  public async getAll(): Promise<IMotorcycle[]> {
    return this.model.find();
  }
  
  public async getById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById({ _id: id });
  }
  
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async update(id: string, motorcycle: IMotorcycle): Promise<IMotorcycle | null> {
    const updateData: IMotorcycle = {
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
      category: motorcycle.category,
      engineCapacity: motorcycle.engineCapacity,
    };

    return this.model.findByIdAndUpdate({ _id: id }, { $set: updateData }, { new: true });
  }
}

export default MotorcycleODM;
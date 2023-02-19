import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    
    super('cars', schema);
  }
  
  public async getAll(): Promise<ICar[]> {
    return this.model.find();
  }
  
  public async getById(id: string): Promise<ICar | null> {
    return this.model.findById({ _id: id });
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async update(id: string, car: ICar): Promise<ICar | null> {
    const updateData: ICar = {
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    };

    return this.model.findByIdAndUpdate({ _id: id }, { $set: updateData }, { new: true });
  }
}

export default CarODM;
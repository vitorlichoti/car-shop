import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      color: this.req.body.color,
      status: this.req.body.status,
      year: this.req.body.year,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.addMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      // this.next(error);
      return this.res.status(400).json(error);
    }
  }

  public async getAll() {
    const motorcycles = await this.service.getAll();

    return this.res.status(200).json(motorcycles);
  }

  public async getById() {
    const { id } = this.req.params;
    
    try {
      const motorcycle = await this.service.getById(id);
      if (!motorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
    }
  }

  public async update() {
    const { id } = this.req.params;
    const motorcycleInput: IMotorcycle = {
      model: this.req.body.model,
      color: this.req.body.color,
      status: this.req.body.status,
      year: this.req.body.year,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const motorcycleUpdate = await this.service.update(id, motorcycleInput);
      if (!motorcycleUpdate) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycleUpdate);
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
    }
  }
}
  
export default MotorcycleController;
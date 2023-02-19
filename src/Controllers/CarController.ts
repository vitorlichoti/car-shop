import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      color: this.req.body.color,
      status: this.req.body.status,
      year: this.req.body.year,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.addCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      // this.next(error);
      return this.res.status(400).json(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAll();

    return this.res.status(200).json(cars);
  }

  public async getById() {
    const { id } = this.req.params;
    
    try {
      const car = await this.service.getById(id);
      if (!car) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(car);
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
    }
  }

  public async update() {
    const { id } = this.req.params;
    const carInput: ICar = {
      model: this.req.body.model,
      color: this.req.body.color,
      status: this.req.body.status,
      year: this.req.body.year,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const carUpdate = await this.service.update(id, carInput);
      if (!carUpdate) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(carUpdate);
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
    }
  }
}
  
export default CarController;
import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.get('/cars', (req, res, next) => new CarController(req, res, next).getAll());
carRoutes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getById());
carRoutes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
carRoutes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());
// carRoutes.delete('/cars/:id', (req, res, next) => new CarController(req, res, next).remove());

export default carRoutes;
import express from 'express';
import carRoutes from './Routes/Car.routes';
import motorcyclesRoutes from './Routes/Motorcycle.routes';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(motorcyclesRoutes);

export default app;

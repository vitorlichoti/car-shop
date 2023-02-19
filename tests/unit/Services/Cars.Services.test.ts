import { expect } from 'chai';
import sinon from 'sinon';

import { Model } from 'mongoose';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('TESTES NA CARS SERVICES', function () {
  describe('SUCCESS CASES', function () {
    it('Deveria cadastrar um carro com SUCESSO', async function () {
      // Arrange
      const carInput: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const carOutPut: Car = new Car(
        {
          id: '6348513f34c397abcad040b2',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.990,
          doorsQty: 4,
          seatsQty: 5,
        },
      );

      sinon.stub(Model, 'create').resolves(carOutPut);
      // Act
      const service = new CarService();
      const result = await service.addCar(carInput);

      // Assert
      expect(result).to.be.deep.equal(carOutPut);
    });

    it('Deveria listar todos os carros com SUCESSO', async function () {
      // Arrange
      const carOutPut: ICar[] = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];

      sinon.stub(Model, 'find').resolves(carOutPut);
      // Act
      const service = new CarService();
      const result = await service.getAll();
      // Assert
      expect(result).to.be.deep.equal(carOutPut);
    });

    it('Deveria retornar o carro do id informado com SUCESSO', async function () {
      // Arrange
      const idInput = '634852326b35b59438fbea2f';

      const carOutPut: ICar = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findById').resolves(carOutPut);
      // Act
      const service = new CarService();
      const result = await service.getById(idInput);
      // Assert
      expect(result).to.be.deep.equal(carOutPut);
    });

    it('Deveria atualizar o carro do id informado com SUCESSO', async function () {
      // Arrange
      const idToUpdate = '63ebb1261e0a620aca4659f0';

      const inputUpdates = {
        model: 'Maverick',
        year: 1989,
        color: 'Blue',
        status: true,
        buyValue: 25.00,
        doorsQty: 4,
        seatsQty: 5,
      };

      const updateOutPut = {
        id: '63ebb1261e0a620aca4659f0',
        model: 'Maverick',
        year: 1989,
        color: 'Blue',
        status: true,
        buyValue: 25,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutPut);
      // Act
      const service = new CarService();
      const result = await service.update(idToUpdate, inputUpdates);
      // Assert
      expect(result).to.be.deep.equal(updateOutPut);
      sinon.restore();
    });

    it('Deveria remover o carro do id informado com SUCESSO', async function () {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('FAILURE CASES', function () {
    it('GET/:id Deveria retornar o status 404 e a mensagem "Car not found"', async function () {
      // Arrange
      // Act
      // Assert
    });
  
    it('GET/:id Deveria retornar o status 422 e a mensagem "Invalid mongo id"', async function () {
      // Arrange
      // Act
      // Assert
    });
  
    it('PUT/:id Deveria retornar o status 404 e a mensagem "Car not found"', async function () {
      // Arrange
      // Act
      // Assert
    });
  
    it('PUT/:id Deveria retornar o status 422 e a mensagem "Invalid mongo id"', async function () {
      // Arrange
      // Act
      // Assert
    });
  });
});
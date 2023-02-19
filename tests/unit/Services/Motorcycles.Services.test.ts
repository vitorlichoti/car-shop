import { expect } from 'chai';
import sinon from 'sinon';

import { Model } from 'mongoose';

import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('TESTES NA MOTORCYCLES SERVICES', function () {
  describe('SUCCESS CASES', function () {
    it('Deveria cadastrar uma Moto com SUCESSO', async function () {
      // Arrange
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const motorcycleOutPut: Motorcycle = new Motorcycle(
        {
          id: '6348513f34c397abcad040b2',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
      );

      sinon.stub(Model, 'create').resolves(motorcycleOutPut);
      // Act
      const service = new MotorcycleService();
      const result = await service.addMotorcycle(motorcycleInput);

      // Assert
      expect(result).to.be.deep.equal(motorcycleOutPut);
    });

    it('Deveria listar todos os Motorcycles com SUCESSO', async function () {
      // Arrange
      const motorcycleOutPut: IMotorcycle[] = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'CB 500',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          category: 'Street',
          engineCapacity: 500,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          category: 'Street',
          engineCapacity: 500,
        },
      ];

      sinon.stub(Model, 'find').resolves(motorcycleOutPut);
      // Act
      const service = new MotorcycleService();
      const result = await service.getAll();
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutPut);
    });

    it('Deveria retornar o Motorcycle do id informado com SUCESSO', async function () {
      // Arrange
      const idInput = '634852326b35b59438fbea2f';

      const motorcycleOutPut: IMotorcycle = {
        id: '634852326b35b59438fbea2f',
        model: 'CB 500',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        category: 'Street',
        engineCapacity: 500,
      };

      sinon.stub(Model, 'findById').resolves(motorcycleOutPut);
      // Act
      const service = new MotorcycleService();
      const result = await service.getById(idInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutPut);
    });

    it('Deveria atualizar o Motorcyclero do id informado com SUCESSO', async function () {
      // Arrange
      const idToUpdate = '63ebb1261e0a620aca4659f0';

      const inputUpdates: IMotorcycle = {
        model: 'Hornet',
        year: 1989,
        color: 'Blue',
        status: true,
        buyValue: 25.00,
        category: 'Street',
        engineCapacity: 600,
      };

      const updateOutPut = {
        id: '63ebb1261e0a620aca4659f0',
        model: 'CB 500',
        year: 1989,
        color: 'Blue',
        status: true,
        buyValue: 25,
        category: 'Street',
        engineCapacity: 500,
      };

      sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutPut);
      // Act
      const service = new MotorcycleService();
      const result = await service.update(idToUpdate, inputUpdates);
      // Assert
      expect(result).to.be.deep.equal(updateOutPut);
    });

    it('Deveria remover o Motorcyclero do id informado com SUCESSO', async function () {
      // Arrange
      // Act
      // Assert
    });
  });

  //   describe('FAILURE CASES', function () {
  //     it('GET/:id Deve retornar o status 404 e a mensagem "Motorcycle not found"', async function () {
  //       // Arrange
  //       // Act
  //       // Assert
  //     });
  
  //     it('GET/:id Deveria retornar o status 422 e a mensagem "Invalid mongo id"', async function () {
  //       // Arrange
  //       // Act
  //       // Assert
  //     });
  
  //     it('PUT/:id Deve retornar o status 404 e a mensagem "Motorcycle not found"', async function () {
  //       // Arrange
  //       // Act
  //       // Assert
  //     });
  
//     it('PUT/:id Deveria retornar o status 422 e a mensagem "Invalid mongo id"', async function () {
//       // Arrange
//       // Act
//       // Assert
//     });
//   });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { CategoryService } from '../../category/category.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let category: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService, 
        {
          provide: 'PRODUCT_REPOSITORY',
          useValue: {
            findOne: async () => Promise.resolve(productMock),
            find: async () => Promise.resolve([productMock]),
            save: async () => Promise.resolve(productMock)
          },
          
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: async() => Promise.resolve(categoryMock)
          }
        }
        
      ],
      
    }).compile();

    service = module.get<ProductService>(ProductService);
    category = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(category).toBeDefined();
  });

  it('shoul return all products', async() => {

    const products = await service.findAll();

    expect(products).toEqual([productMock]);

  })

  it('shoul return error if products empty', async() => {

    jest.spyOn(service, 'findAll').mockRejectedValue(new Error())

    expect(service.findAll()).rejects.toThrowError()

  })

  it('should retrun new product', async () => {
    const product = await service.createProduct(productMock);

    expect(product).toEqual(productMock);
  });

  it('Should return error if not exist category', async() => {
    jest.spyOn(category, 'findCategoryById').mockRejectedValue(new Error());

    // try{

    //   await service.createProduct(productMock);

    // }catch(err){
      expect(service.createProduct(productMock)).rejects.toThrowError()
    // }
  })

  it('Should return product in find by id', async() => {
    const product = await service.findProductById(productMock.id);

    expect(product).toEqual(productMock);
  });

  // it('Should return error in product not found', async() => {
  //   jest.spyOn(service, 'findProductById').mockRejectedValue(new Error('Produto não encontrado!'));

  //   const product = await service.findProductById(productMock.id).catch((err) => err);
    
  //   expect(product).rejects.toThrow();

  // })

});

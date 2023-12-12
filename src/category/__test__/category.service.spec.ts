import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-categoria.mock';


describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService, 
        {
          provide: 'CATEGORY_REPOSITORY',
          useValue: {
            findOne: async () => Promise.resolve(categoryMock),
            find: async () => Promise.resolve([categoryMock]),
            save: async () => Promise.resolve(categoryMock)
          },
        }
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list category', async() => {
    const categories = await service.findAllCategories();

    expect(categories).toEqual([categoryMock])
  })

  it('should return error in list empty', async() => {
     // Mockando um cenário em que findAllCategories retorna um erro
      jest.spyOn(service, 'findAllCategories').mockRejectedValue(new Error('Não existe nenhuma categoria!'));

      try {
        // Chame a função que deve lançar um erro
        await service.findAllCategories();
      } catch (error) {
        // Verifique se o erro corresponde ao que você espera
        expect(error.message).toBe('Não existe nenhuma categoria!');
      }
  })

  it('should return category by id', async () => {
    const category = await service.findCategoryById(categoryMock.id);

    expect(category).toEqual(categoryMock);
  })

  it('Should return error if id not found', async () => {
    jest.spyOn(service, 'findCategoryById').mockImplementation(undefined);

    try{ 

      await service.findCategoryById(categoryMock.id);

    }catch(err){
      expect(err.message).rejects.toThrow()
    }

  })

  it('should return erro if exist category name', async () => {

    try{

      await service.createCategory(createCategoryMock);

    }catch(err){
      expect(err.message).toBe("Essa categoria já existe!");
    }
    
  })

  it('should return error in expection', async () => {
    jest.spyOn(service, 'createCategory').mockRejectedValue(new Error('Não foi possivel adicionar a categoria!'));

    try{

      await service.createCategory(categoryMock);

    }catch(err) {
      expect(err.message).toBe('Não foi possivel adicionar a categoria!')
    }
  });

  // it('should return category after save', async () => {
  //   jest.spyOn(service, 'createCategory').mockRejectedValue(undefined);

  //   const categoria = await service.createCategory(createCategoryMock);

  //   expect(categoria).toEqual(categoryMock);
  // })

  it('should return Category in find by name', async () => {
    const category = await service.findCategoryByName(createCategoryMock.name);

    expect(category).toEqual(categoryMock);
  });

  it('Should return error if category find by name empty', async () => {
    
    jest.spyOn(service, 'findCategoryByName').mockRejectedValue(undefined);

    try{

      await service.createCategory(createCategoryMock);

    }catch(error){
      expect(error.message).rejects.toThrowError();
    }
  })

});

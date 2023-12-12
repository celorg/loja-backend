import { Test, TestingModule } from '@nestjs/testing';
import { Inject } from "@nestjs/common";
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';
import { UserService } from '../user.service';
import { userEntityMock } from '../__mocks__/user.mock';
import { userProviders } from '../user.providers';
import { DatabaseModule } from '../../database/database.module';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<UserEntity>;
  

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      
      providers: [
        UserService,
          {
            provide: 'USER_REPOSITORY',
            useValue: {
              findOne: async () =>
                Promise.resolve(userEntityMock),
            },
          },
          
        
      ]
    }).compile();

    service = await module.get(UserService);
    // repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // expect(repo).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {

    const result = await service.getUserByEmail(userEntityMock.email);

    expect(result).toEqual(userEntityMock);
    
  });

  it('should return error in findUserbByEmail', async (value) => {

    jest.spyOn(repo ,'findOne').mockImplementation(() => undefined);
    
    await expect(Promise.reject(service.getUserByEmail('teste@gmail.com'))).rejects.toThrow();

  })

});
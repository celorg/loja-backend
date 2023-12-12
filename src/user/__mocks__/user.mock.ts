import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  email: 'test@guido.com',
  id: "lkjdkfjdaldkfdkf",
  name: 'nameMock',
  password: '$2b$10$S62WmVpIxL52Z.0y22DWfuaAz8.XUNESChWP.AlMFZnOJ9n9uiqi.',
  phone: '321532523532',
  typeUser: UserType.User,
  updatedAt: new Date(),
  createdAt: new Date(),
};
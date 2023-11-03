import { Inject, Injectable } from '@nestjs/common';
import { IUser, IUserDao } from './interfaces/IUser.interface';

import { CreateUserDto } from './dto/CreateUserDTO';
import { GetUserDto } from './dto/GetUserDTO';
import { UpdateUserDto } from './dto/UpdateDaoDTO';

@Injectable()
export class UsersService implements IUser {
    constructor(@Inject(IUserDao) private readonly usersDao: IUser) {}
    async create(user: CreateUserDto): Promise<GetUserDto> {
        return this.usersDao.create(user);
    }
    updateById(id: string, user: UpdateUserDto): Promise<GetUserDto> {
        return this.usersDao.updateById(id, user);
    }

    getAll(userLogged: GetUserDto): Promise<GetUserDto[]> {
        return this.usersDao.getAll(userLogged);
    }
    getById(id: string, options = { }): Promise<GetUserDto> {
        return this.usersDao.getById(id, options);
    }

    getByEmail(email: string): Promise<GetUserDto> {
        return this.usersDao.getByEmail(email);
    }
}

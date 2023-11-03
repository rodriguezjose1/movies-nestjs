import { Injectable } from '@nestjs/common';
import { IUser, IUserDao } from './interfaces/IUser.interface';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UpdateUserDto } from './dto/UpdateDaoDTO';

@Injectable()
export class UsersDao {
    constructor(private usersDao: IUser) { }

    async create(user: CreateUserDto) {
        return this.usersDao.create(user);
    }

    updateById(id: string, user: UpdateUserDto) {
        return this.usersDao.updateById(id, user);
    }

    getById(id: string, options) {
        return this.usersDao.getById(id, options);
    }
}

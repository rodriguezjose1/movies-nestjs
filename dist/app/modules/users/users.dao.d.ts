import { IUser } from './interfaces/IUser.interface';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UpdateUserDto } from './dto/UpdateDaoDTO';
export declare class UsersDao {
    private usersDao;
    constructor(usersDao: IUser);
    create(user: CreateUserDto): Promise<import("./dto/GetUserDTO").GetUserDto>;
    updateById(id: string, user: UpdateUserDto): Promise<import("./dto/GetUserDTO").GetUserDto>;
    getById(id: string, options: any): Promise<import("./dto/GetUserDTO").GetUserDto>;
}

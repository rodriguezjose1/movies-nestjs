import { IUser } from './interfaces/IUser.interface';
import { CreateUserDto } from './dto/CreateUserDTO';
import { GetUserDto } from './dto/GetUserDTO';
import { UpdateUserDto } from './dto/UpdateDaoDTO';
export declare class UsersService implements IUser {
    private readonly usersDao;
    constructor(usersDao: IUser);
    create(user: CreateUserDto): Promise<GetUserDto>;
    updateById(id: string, user: UpdateUserDto): Promise<GetUserDto>;
    getAll(userLogged: GetUserDto): Promise<GetUserDto[]>;
    getById(id: string, options?: {}): Promise<GetUserDto>;
    getByEmail(email: string): Promise<GetUserDto>;
}

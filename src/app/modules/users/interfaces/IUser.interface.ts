import { CreateUserDto } from "../dto/CreateUserDTO";
import { GetUserDto } from "../dto/GetUserDTO";
import { UpdateUserDto } from "../dto/UpdateDaoDTO";

export interface IUser {
    create(user: CreateUserDto): Promise<GetUserDto>;
    updateById(id: string, user: UpdateUserDto): Promise<GetUserDto>;
    getById(id: string, options: any): Promise<GetUserDto>;
    getByEmail(email: string): Promise<GetUserDto>;
    getAll(userLogged: GetUserDto): Promise<GetUserDto[]>;
}

export const IUserDao = Symbol("IUserDao");
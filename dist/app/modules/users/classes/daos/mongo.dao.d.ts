import { Model } from 'mongoose';
import { User } from '../../../../models/user.model';
import { IUser } from '../../interfaces/IUser.interface';
import { GetUserDto } from '../../dto/GetUserDTO';
import { CreateUserDto } from '../../dto/CreateUserDTO';
export declare class MongoUsersDao implements IUser {
    private userModel;
    constructor(userModel: Model<User>);
    mapToDto(user: User, { password, refresh_token, role }?: {
        password?: boolean;
        refresh_token?: boolean;
        role?: boolean;
    }): GetUserDto;
    mapUsersToDto(users: any): any;
    create(user: CreateUserDto): Promise<GetUserDto>;
    updateById(id: any, user: CreateUserDto): Promise<GetUserDto>;
    getAll(userLogged: GetUserDto): Promise<any>;
    getById(id: string, options: any): Promise<any>;
    getByEmail(email: string): Promise<GetUserDto>;
}

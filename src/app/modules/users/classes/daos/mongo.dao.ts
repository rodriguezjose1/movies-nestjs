import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../../models/user.model';
import { IUser, IUserDao } from '../../interfaces/IUser.interface';
import { GetUserDto } from '../../dto/GetUserDTO';
import { CreateUserDto } from '../../dto/CreateUserDTO';

@Injectable()
export class MongoUsersDao implements IUser {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    mapToDto (user: User, { password = false, refresh_token = false, role = false } = {}): GetUserDto {
        const mapped: any = {
            id: user._id,
            name: user.name.toString(),
            lastname: user.lastname,
            email: user.email
        }

        if (password) {
            mapped.password = user.password
        }

        if (refresh_token) {
            mapped.refresh_token = user.refresh_token;
        }

        if (role) {
            mapped.role = user.role;
        }

        return mapped
    }

    mapUsersToDto (users) {
        return users.map(user => this.mapToDto(user))
    }

    async create(user: CreateUserDto) {
        const createdUser = await this.userModel.create(user);
        return this.mapToDto(createdUser);
    }

    async updateById(id: any, user: CreateUserDto) {
        const userDB = await this.getById(id, { refresh_token: true });
        if (!userDB) return null;

        const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, { $set: { ... user } }, { new: true });
        return this.mapToDto(updatedUser);
    }

    async getAll(userLogged: GetUserDto): Promise<any> {
        const users = await this.userModel.find();
        if (!users) return null;
        return this.mapUsersToDto(users);
    }

    async getById(id: string, options): Promise<any> {
        const user = await this.userModel.findById(id);
        if (!user) return null;
        return this.mapToDto(user, options);
    }

    async getByEmail(email: string): Promise<GetUserDto> {
        const user = await this.userModel.findOne({ email });
        if (!user) return null;
        return this.mapToDto(user, { password: true });;
    }
}

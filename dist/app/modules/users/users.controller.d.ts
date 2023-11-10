import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/UpdateDaoDTO';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateById(id: string, body: UpdateUserDto, req: any): Promise<{
        user: import("./dto/GetUserDTO").GetUserDto;
    }>;
    getProfile(req: any): Promise<{
        user: import("./dto/GetUserDTO").GetUserDto;
    }>;
    getById(id: string): Promise<{
        user: import("./dto/GetUserDTO").GetUserDto;
    }>;
    getUsers(req: any): Promise<{
        users: import("./dto/GetUserDTO").GetUserDto[];
    }>;
}

import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UpdateUserDto } from './dto/UpdateDaoDTO';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Role } from '../auth/auth.constants';
import { HasRoles } from '../../../core/decorators/has-roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Put(':id')
    @HasRoles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateById(@Param('id') id: string, @Body() body: UpdateUserDto, @Req() req: any) {
        if (req.user.role === Role.User && req.user.id.toString() !== id) throw new ForbiddenException('Forbidden');

        const user = await this.usersService.updateById(id, body);
        if (!user) throw new NotFoundException('User not found');

        return { user };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: any) {
        const user = await this.usersService.getById(req.user.id);

        return { user };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.usersService.getById(id);

        return { user };
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getUsers(@Req() req: any) {
        const users = await this.usersService.getAll(req.user);

        return { users };
    }
}

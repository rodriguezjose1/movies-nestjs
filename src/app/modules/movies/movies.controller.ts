import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovieDTO';
import { UpdateMovieDto } from './dto/UpdateMovieDTO';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Role } from '../auth/auth.constants';
import { HasRoles } from '../../../core/decorators/has-roles.decorator';
import { QueryMoviesDto } from './dto/QueryMoviesDTO';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }
    
    @Post()
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() body: CreateMovieDto, @Req() req: any) {
        body.publisher_user = req.user.id;
        const movie = await this.moviesService.create(body);

        return { movie };
    }

    @Put(':id')
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateById(@Param('id') id: string, @Body() body: UpdateMovieDto, @Req() req: any) {
        const movie = await this.moviesService.updateById(id, body);
        if (!movie) throw new NotFoundException('Movie not found');

        return { movie };
    }

    @Get(':id')
    @HasRoles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getById(@Param('id') id: string) {
        const movie = await this.moviesService.getById(id);

        return { movie };
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(@Query() query: QueryMoviesDto) {
        const movies = await this.moviesService.getAll(query);

        return movies;
    }

    @Delete(':id')
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteById(@Param('id') id: string) {
        const movie = await this.moviesService.deleteById(id);

        return { movie };
    }
}
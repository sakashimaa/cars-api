import { Controller, Get, Post, Put, Delete, UseGuards, Request, Param, Body, ParseIntPipe, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // Извлекаем email из payload JWT токена
    const email = req.user.email;
    
    // Находим пользователя по email
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailConfirmed: user.isEmailConfirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ) {
    // Получаем пользователя из JWT токена
    const email = req.user.email;
    const currentUser = await this.usersService.findByEmail(email);
    
    if (!currentUser) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    
    // Проверяем, что пользователь обновляет свой профиль или является администратором
    if (currentUser.id !== id) {
      throw new ForbiddenException('У вас нет прав для обновления профиля другого пользователя');
    }
    
    return this.usersService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Request() req,
    @Param('id', ParseIntPipe) id: number
  ) {
    // Получаем пользователя из JWT токена
    const email = req.user.email;
    const currentUser = await this.usersService.findByEmail(email);
    
    if (!currentUser) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    
    // Проверяем, что пользователь удаляет свой профиль или является администратором
    if (currentUser.id !== id) {
      throw new ForbiddenException('У вас нет прав для удаления профиля другого пользователя');
    }
    
    return this.usersService.remove(id);
  }
}

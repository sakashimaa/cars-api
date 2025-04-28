import { Controller, Get, Post, Param, Query, NotFoundException, BadRequestException, UseGuards, Res, Request } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('send-verification/:userId')
  async sendVerificationEmail(@Param('userId') userId: string) {
    await this.emailVerificationService.sendVerificationEmail(+userId);
    return { message: 'Письмо для подтверждения отправлено' };
  }

  @Get('confirm')
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    if (!token) {
      throw new BadRequestException('Токен не предоставлен');
    }
    
    try {
      const user = await this.emailVerificationService.verifyEmail(token);
      
      // URL фронтенда для перенаправления (настроить в конфигурации)
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:5058/');
      const redirectUrl = `${frontendUrl}email-verified?success=true&email=${encodeURIComponent(user.email)}`;
      
      // Перенаправляем пользователя на фронтенд
      return res.redirect(redirectUrl);
    } catch (error) {
      // В случае ошибки перенаправляем с параметром ошибки
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:5058/');
      const errorMessage = encodeURIComponent(error.message || 'Ошибка подтверждения email');
      const redirectUrl = `${frontendUrl}email-verified?success=false&error=${errorMessage}`;
      
      return res.redirect(redirectUrl);
    }
  }

  @Get('verification-status')
  @UseGuards(JwtAuthGuard)
  async getVerificationStatus(@Request() req) {
    // Извлекаем email из payload JWT токена
    const email = req.user.email;
    
    // Находим пользователя по email
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    
    return {
      isEmailConfirmed: user.isEmailConfirmed,
      email: user.email
    };
  }

  @Post('resend-verification')
  @UseGuards(JwtAuthGuard)
  async resendVerificationEmail(@Request() req) {
    const email = req.user.email;
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    
    await this.emailVerificationService.sendVerificationEmail(user.id);
    return { message: 'Письмо для подтверждения отправлено повторно' };
  }
} 
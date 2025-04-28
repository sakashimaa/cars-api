import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from './email-verification.entity';
import { User } from '../users/user.entity';
import { EmailService } from './email.service';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private emailVerificationRepository: Repository<EmailVerification>,
    private emailService: EmailService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createVerificationToken(user: User): Promise<EmailVerification> {
    // Удаляем предыдущие токены для этого пользователя
    await this.emailVerificationRepository.delete({ userId: user.id });

    // Создаем новый токен
    const token = randomBytes(32).toString('hex');
    
    // Срок действия токена - 24 часа
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const verification = this.emailVerificationRepository.create({
      userId: user.id,
      token,
      expiresAt,
    });

    return this.emailVerificationRepository.save(verification);
  }

  async sendVerificationEmail(userId: number): Promise<void> {
    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }
    
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email уже подтвержден');
    }
    
    const verification = await this.createVerificationToken(user);
    await this.emailService.sendEmailConfirmation(user, verification.token);
  }

  async verifyEmail(token: string): Promise<User> {
    const verification = await this.emailVerificationRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    
    if (!verification) {
      throw new NotFoundException('Неверный токен подтверждения');
    }
    
    const currentDate = new Date();
    if (verification.expiresAt < currentDate) {
      await this.emailVerificationRepository.remove(verification);
      throw new BadRequestException('Токен подтверждения истек');
    }
    
    // Подтверждаем email пользователя
    const updatedUser = await this.usersService.update(verification.userId, {
      isEmailConfirmed: true
    });
    
    // Удаляем использованный токен
    await this.emailVerificationRepository.remove(verification);
    
    return updatedUser;
  }
} 
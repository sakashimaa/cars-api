import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailConfirmation(user: User, token: string): Promise<void> {
    const url = `${this.configService.get('APP_URL', 'http://localhost:3002')}/email/confirm?token=${token}`;
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Подтверждение электронной почты',
      html: `
        <p>Здравствуйте, ${user.firstName || 'пользователь'}!</p>
        <p>Пожалуйста, подтвердите вашу электронную почту, перейдя по ссылке:</p>
        <p>
          <a href="${url}">Подтвердить email</a>
        </p>
        <p>Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.</p>
      `,
    });
  }
} 
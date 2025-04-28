import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailVerificationService } from './email-verification.service';
import { EmailController } from './email.controller';
import { EmailVerification } from './email-verification.entity';
import { UsersModule } from '../users/users.module';
import mailConfig from '../config/mail.config';

@Module({
  imports: [
    ConfigModule.forFeature(mailConfig),
    TypeOrmModule.forFeature([EmailVerification]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          port: configService.get('mail.port'),
          secure: false,
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.password'),
          },
        },
        defaults: {
          from: configService.get('mail.from'),
        },
      }),
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [EmailService, EmailVerificationService],
  exports: [EmailService, EmailVerificationService],
  controllers: [EmailController],
})
export class EmailModule {} 
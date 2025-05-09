import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private adminService: AdminService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    // Проверяем, что у токена есть имя пользователя и sub
    if (!payload.username || !payload.sub) {
      throw new UnauthorizedException('Некорректный токен администратора');
    }

    // Проверяем существование администратора
    const admin = await this.adminService.findOne(payload.sub);

    // Возвращаем данные для использования в req.user
    return {
      adminId: admin.id,
      username: admin.username,
      isSuperAdmin: admin.isSuperAdmin,
      permissions: admin.permissions,
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    // Проверяем, существует ли пользователь с таким email
    const user = await this.usersService.findByEmail(payload.email);
    
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    
    // Проверяем, совпадает ли ID пользователя с sub из токена
    if (user.id !== payload.sub) {
      throw new UnauthorizedException('Некорректный токен');
    }
    
    // Возвращаем только базовую информацию о пользователе для использования в req.user
    return { 
      userId: user.id, 
      email: user.email
    };
  }
} 
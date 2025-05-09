import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CombinedAuthGuard extends AuthGuard(['jwt', 'jwt-admin']) {
  // Переопределяем метод getRequest, чтобы передать запрос в стратегии
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  // Переопределяем метод handleRequest для обработки возможных ошибок
  handleRequest(err: any, user: any, info: any) {
    // Если хотя бы одна стратегия вернула пользователя, авторизация прошла успешно
    if (user) {
      return user;
    }

    // Если нет ошибок, но и пользователя нет, то это 401 Unauthorized
    if (!err) {
      return null;
    }

    // Если есть ошибка, пробросим ее дальше
    throw err;
  }
}

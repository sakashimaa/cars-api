<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## PostgreSQL Setup

This API requires PostgreSQL. Make sure you have PostgreSQL installed and running.

1. Create a database with the name specified in the .env file (`cars_api` by default)
2. Configure the database connection parameters in the .env file:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=cars_api
   JWT_SECRET=your_secret_key
   JWT_ADMIN_EXPIRES_IN=24h

   # S3 Storage Configuration (Yandex Cloud)
   S3_ENDPOINT=https://storage.yandexcloud.net
   S3_REGION=ru-central1
   S3_BUCKET=your-bucket-name
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Cars API

API для управления автосервисом, автомобилями, деталями, услугами и клиентами.

## Установка и запуск

```bash
# Установка зависимостей
$ npm install

# Запуск в режиме разработки
$ npm run start:dev

# Запуск в продакшн режиме
$ npm run start:prod
```

## Настройка базы данных

Приложение использует PostgreSQL. Убедитесь, что PostgreSQL установлен и запущен.

1. Создайте базу данных с именем, указанным в файле .env (`cars_api` по умолчанию)
2. Настройте параметры подключения в файле .env:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=cars_api
   JWT_SECRET=your_secret_key
   JWT_ADMIN_EXPIRES_IN=24h

   # S3 Storage Configuration (Yandex Cloud)
   S3_ENDPOINT=https://storage.yandexcloud.net
   S3_REGION=ru-central1
   S3_BUCKET=your-bucket-name
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   ```

## Миграции

```bash
# Создание миграции
$ npm run migration:create --name=MigrationName

# Генерация миграции на основе изменений сущностей
$ npm run migration:generate --name=MigrationName

# Запуск миграций
$ npm run migration:run

# Откат последней миграции
$ npm run migration:revert
```

## Создание администратора

Для создания первого администратора выполните:

```bash
$ npm run create-admin
```

Это создаст пользователя с логином `admin` и паролем `admin123`.

## API Документация

### Аутентификация пользователей

#### Регистрация пользователя

- **URL**: `/auth/register`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "Иван",
    "lastName": "Иванов"
  }
  ```
- **Ответ**:
  ```json
  {
    "access_token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Иван",
      "lastName": "Иванов",
      "isEmailConfirmed": false
    }
  }
  ```

#### Вход пользователя

- **URL**: `/auth/login`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Ответ**:
  ```json
  {
    "access_token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Иван",
      "lastName": "Иванов",
      "isEmailConfirmed": false
    }
  }
  ```

#### Получение профиля пользователя

- **URL**: `/auth/profile`
- **Метод**: `GET`
- **Авторизация**: Bearer token
- **Ответ**:
  ```json
  {
    "userId": 1,
    "email": "user@example.com"
  }
  ```

### Администраторы

#### Вход администратора

- **URL**: `/admin/login`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Ответ**:
  ```json
  {
    "access_token": "JWT_TOKEN",
    "admin": {
      "id": 1,
      "username": "admin",
      "fullName": "Главный Администратор",
      "isSuperAdmin": true,
      "permissions": [
        "users.manage",
        "cars.manage",
        "workers.manage",
        "services.manage"
      ]
    }
  }
  ```

#### Получение профиля администратора

- **URL**: `/admin/profile`
- **Метод**: `GET`
- **Авторизация**: Bearer token (admin)
- **Ответ**:
  ```json
  {
    "adminId": 1,
    "username": "admin",
    "isSuperAdmin": true,
    "permissions": [
      "users.manage",
      "cars.manage",
      "workers.manage",
      "services.manage"
    ]
  }
  ```

#### Получение списка администраторов

- **URL**: `/admin`
- **Метод**: `GET`
- **Авторизация**: Bearer token (admin)
- **Ответ**: Массив объектов `Admin`

#### Получение администратора по ID

- **URL**: `/admin/:id`
- **Метод**: `GET`
- **Авторизация**: Bearer token (admin)
- **Ответ**: Объект `Admin`

### Пользователи

#### Получение всех пользователей

- **URL**: `/users`
- **Метод**: `GET`
- **Авторизация**: Bearer token
- **Ответ**: Массив объектов `User`

#### Получение пользователя по ID

- **URL**: `/users/:id`
- **Метод**: `GET`
- **Авторизация**: Bearer token
- **Ответ**: Объект `User`

#### Обновление пользователя

- **URL**: `/users/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "firstName": "Иван",
    "lastName": "Петров",
    "phone": "+7 (999) 123-45-67"
  }
  ```
- **Ответ**: Обновленный объект `User`

#### Удаление пользователя

- **URL**: `/users/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Автомобили

#### Получение всех автомобилей

- **URL**: `/cars`
- **Метод**: `GET`
- **Ответ**: Массив объектов `Car`

#### Получение автомобиля по ID

- **URL**: `/cars/:id`
- **Метод**: `GET`
- **Ответ**: Объект `Car`

#### Создание автомобиля

- **URL**: `/cars`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "BMW X5",
    "shortDescription": "Премиальный внедорожник",
    "fullDescription": "Полное описание автомобиля BMW X5",
    "price": 5000000,
    "quantity": 3,
    "imagePath": "/images/bmw-x5.jpg"
  }
  ```
- **Ответ**: Созданный объект `Car`

#### Обновление автомобиля

- **URL**: `/cars/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "BMW X5 (обновленный)",
    "price": 5200000
  }
  ```
- **Ответ**: Обновленный объект `Car`

#### Удаление автомобиля

- **URL**: `/cars/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Работники

#### Получение всех работников

- **URL**: `/workers`
- **Метод**: `GET`
- **Ответ**: Массив объектов `Worker`

#### Получение работника по ID

- **URL**: `/workers/:id`
- **Метод**: `GET`
- **Ответ**: Объект `Worker`

#### Создание работника

- **URL**: `/workers`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Алексей Смирнов",
    "shortDescription": "Автомеханик с 10-летним стажем",
    "fullDescription": "Опытный автомеханик, специализирующийся на немецких автомобилях",
    "position": "Старший механик",
    "workTime": 8,
    "imagePath": "/images/workers/alexey.jpg"
  }
  ```
- **Ответ**: Созданный объект `Worker`

#### Обновление работника

- **URL**: `/workers/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "position": "Главный механик",
    "workTime": 9
  }
  ```
- **Ответ**: Обновленный объект `Worker`

#### Удаление работника

- **URL**: `/workers/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

#### Добавление отзыва о работнике

- **URL**: `/workers/:id/reviews`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "shortDescription": "Отличная работа",
    "fullDescription": "Очень доволен качеством ремонта и обслуживанием",
    "rating": 5
  }
  ```
- **Ответ**: Созданный объект `Review`

#### Получение отзывов о работнике

- **URL**: `/workers/:id/reviews`
- **Метод**: `GET`
- **Ответ**: Массив объектов `Review`

### Задачи

#### Получение всех задач

- **URL**: `/tasks`
- **Метод**: `GET`
- **Авторизация**: Bearer token
- **Ответ**: Массив объектов `Task`

#### Получение задачи по ID

- **URL**: `/tasks/:id`
- **Метод**: `GET`
- **Авторизация**: Bearer token
- **Ответ**: Объект `Task`

#### Создание задачи

- **URL**: `/tasks`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Замена масла",
    "description": "Замена масла и фильтров в BMW X5"
  }
  ```
- **Ответ**: Созданный объект `Task`

#### Обновление задачи

- **URL**: `/tasks/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Срочная замена масла",
    "description": "Срочная замена масла и фильтров в BMW X5"
  }
  ```
- **Ответ**: Обновленный объект `Task`

#### Удаление задачи

- **URL**: `/tasks/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Детали

#### Получение всех деталей

- **URL**: `/details`
- **Метод**: `GET`
- **Ответ**: Массив объектов `Details`

#### Получение детали по ID

- **URL**: `/details/:id`
- **Метод**: `GET`
- **Ответ**: Объект `Details`

#### Создание детали

- **URL**: `/details`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Масляный фильтр BMW",
    "article": "BMW-OIL-01",
    "creatorCode": "BMW",
    "creator": "Bayerische Motoren Werke AG",
    "detailCategory": "Фильтры",
    "imagePath": "/images/details/bmw-oil-filter.jpg",
    "price": 1500,
    "quantity": 20
  }
  ```
- **Ответ**: Созданный объект `Details`

#### Обновление детали

- **URL**: `/details/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "price": 1600,
    "quantity": 25
  }
  ```
- **Ответ**: Обновленный объект `Details`

#### Удаление детали

- **URL**: `/details/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Услуги

#### Получение всех услуг

- **URL**: `/services`
- **Метод**: `GET`
- **Ответ**: Массив объектов `Service`

#### Получение услуги по ID

- **URL**: `/services/:id`
- **Метод**: `GET`
- **Ответ**: Объект `Service`

#### Создание услуги

- **URL**: `/services`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Замена масла",
    "shortDescription": "Замена масла и масляного фильтра",
    "longDescription": "Полная замена масла и масляного фильтра. Включает диагностику и проверку уровня других жидкостей.",
    "price": 2000,
    "imagePath": "/images/services/oil-change.jpg"
  }
  ```
- **Ответ**: Созданный объект `Service`

#### Обновление услуги

- **URL**: `/services/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "price": 2200,
    "longDescription": "Полная замена масла и масляного фильтра с использованием высококачественных материалов."
  }
  ```
- **Ответ**: Обновленный объект `Service`

#### Удаление услуги

- **URL**: `/services/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Услуги покраски

#### Получение всех услуг покраски

- **URL**: `/painting-services`
- **Метод**: `GET`
- **Ответ**: Массив объектов `PaintingService`

#### Получение услуги покраски по ID

- **URL**: `/painting-services/:id`
- **Метод**: `GET`
- **Ответ**: Объект `PaintingService`

#### Создание услуги покраски

- **URL**: `/painting-services`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "name": "Полная покраска кузова",
    "shortDescription": "Полная покраска кузова автомобиля",
    "longDescription": "Полная покраска кузова автомобиля любой сложности с предварительной подготовкой поверхности.",
    "price": 50000,
    "type": "FULL_BODY",
    "estimatedDays": 7,
    "warrantyMonths": 12,
    "additionalRequirements": "Необходимо предварительное согласование цвета"
  }
  ```
- **Ответ**: Созданный объект `PaintingService`

#### Обновление услуги покраски

- **URL**: `/painting-services/:id`
- **Метод**: `PUT`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "price": 55000,
    "estimatedDays": 8,
    "warrantyMonths": 24
  }
  ```
- **Ответ**: Обновленный объект `PaintingService`

#### Удаление услуги покраски

- **URL**: `/painting-services/:id`
- **Метод**: `DELETE`
- **Авторизация**: Bearer token
- **Ответ**: Сообщение об успешном удалении

### Email верификация

#### Отправка письма для подтверждения email

- **URL**: `/email/send-verification`
- **Метод**: `POST`
- **Авторизация**: Bearer token
- **Тело запроса**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Ответ**: Сообщение об успешной отправке

#### Подтверждение email

- **URL**: `/email/verify`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "token": "verification-token-here"
  }
  ```
- **Ответ**: Сообщение об успешном подтверждении

## Модели данных

### User

```typescript
{
  id: number;
  email: string;
  isEmailConfirmed: boolean;
  password: string; // хешированный пароль
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin

```typescript
{
  id: number;
  username: string;
  password: string; // хешированный пароль
  fullName: string | null;
  isSuperAdmin: boolean;
  permissions: string[];
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Car

```typescript
{
  id: number;
  name: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  price: number | null;
  quantity: number | null;
  imagePath: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Worker

```typescript
{
  id: number;
  name: string;
  shortDescription: string | null;
  fullDescription: string | null;
  imagePath: string | null;
  workTime: number | null;
  position: string | null;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Review

```typescript
{
  id: number;
  shortDescription: string;
  fullDescription: string;
  rating: number;
  worker: Worker;
}
```

### Task

```typescript
{
  id: number;
  name: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Details

```typescript
{
  id: number;
  name: string;
  article: string;
  creatorCode: string;
  creator: string;
  detailCategory: string;
  imagePath: string;
  price: number;
  quantity: number;
}
```

### Service

```typescript
{
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  imagePath: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### PaintingService

```typescript
{
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  type: PaintingType; // FULL_BODY, PARTIAL, REPAIR, или CUSTOM
  estimatedDays: number;
  reviews: string[] | null;
  beforeAfterImages: string[] | null;
  additionalRequirements: string | null;
  warrantyMonths: number | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### EmailVerification

```typescript
{
  id: number;
  userId: number;
  user: User;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}
```

## Лицензия

[MIT](LICENSE)

### Хранилище файлов (S3)

#### Загрузка файла

- **URL**: `/storage/upload`
- **Метод**: `POST`
- **Content-Type**: `multipart/form-data`
- **Параметры**:
  - `file` - файл для загрузки
- **Ответ**:
  ```json
  {
    "message": "Файл успешно загружен",
    "fileName": "image.jpg"
  }
  ```

#### Получение файла

- **URL**: `/storage/:fileName`
- **Метод**: `GET`
- **Ответ**:
  ```json
  {
    "url": "https://storage.yandexcloud.net/my-bucket/image.jpg?X-Amz-Algorithm=..."
  }
  ```
  Возвращает временную ссылку для доступа к файлу, которая действительна в течение 1 часа

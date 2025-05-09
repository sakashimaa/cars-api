import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1686000000000 implements MigrationInterface {
  name = 'InitialSchema1686000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы пользователей
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "isEmailConfirmed" boolean NOT NULL DEFAULT false,
        "password" character varying NOT NULL,
        "firstName" character varying,
        "lastName" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы администраторов
    await queryRunner.query(`
      CREATE TABLE "admins" (
        "id" SERIAL NOT NULL,
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "fullName" character varying,
        "isSuperAdmin" boolean NOT NULL DEFAULT false,
        "permissions" text,
        "isActive" boolean NOT NULL DEFAULT true,
        "lastLoginAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_a27c0a45a73ebbf167e062d8b41" UNIQUE ("username"),
        CONSTRAINT "PK_e3b38270c97a854c77949f52327" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы автомобилей
    await queryRunner.query(`
      CREATE TABLE "car" (
        "id" SERIAL NOT NULL,
        "name" character varying,
        "shortDescription" character varying,
        "fullDescription" character varying,
        "price" decimal(10,2),
        "quantity" integer,
        "imagePath" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы задач
    await queryRunner.query(`
      CREATE TABLE "task" (
        "id" SERIAL NOT NULL,
        "name" character varying,
        "description" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы работников
    await queryRunner.query(`
      CREATE TABLE "workers" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "shortDescription" character varying,
        "fullDescription" character varying,
        "imagePath" character varying,
        "workTime" integer,
        "position" character varying(255),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_e950c9aa4703fbf5b4bab993b91" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы отзывов
    await queryRunner.query(`
      CREATE TABLE "reviews" (
        "id" SERIAL NOT NULL,
        "shortDescription" character varying(255) NOT NULL,
        "fullDescription" text NOT NULL,
        "rating" real NOT NULL,
        "workerId" integer,
        CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы деталей
    await queryRunner.query(`
      CREATE TABLE "details" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "article" text NOT NULL,
        "creatorCode" text NOT NULL,
        "creator" text NOT NULL,
        "detailCategory" text NOT NULL,
        "imagePath" character varying NOT NULL,
        "price" integer NOT NULL,
        "quantity" integer NOT NULL,
        CONSTRAINT "PK_50eee8c3b0a42b2307f4e547070" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы услуг
    await queryRunner.query(`
      CREATE TABLE "services" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "shortDescription" character varying(500) NOT NULL,
        "longDescription" text NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "imagePath" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы услуг покраски
    await queryRunner.query(`
      CREATE TYPE "public"."painting_services_type_enum" AS ENUM('FULL_BODY', 'PARTIAL', 'REPAIR', 'CUSTOM')
    `);
    await queryRunner.query(`
      CREATE TABLE "painting_services" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "shortDescription" character varying NOT NULL,
        "longDescription" text NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "type" "public"."painting_services_type_enum" NOT NULL DEFAULT 'CUSTOM',
        "estimatedDays" integer NOT NULL,
        "reviews" text,
        "beforeAfterImages" text,
        "additionalRequirements" character varying,
        "warrantyMonths" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a5c3b3df6a92f67b44f9e8b7cf9" PRIMARY KEY ("id")
      )
    `);

    // Создание таблицы подтверждения email
    await queryRunner.query(`
      CREATE TABLE "email_verification" (
        "id" SERIAL NOT NULL,
        "userId" integer NOT NULL,
        "token" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "expiresAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_f95912aaae3f15970aece5df9ce" PRIMARY KEY ("id")
      )
    `);

    // Создание внешних ключей
    await queryRunner.query(`
      ALTER TABLE "reviews" ADD CONSTRAINT "FK_d0a9e330a1c2195db288b1c9d76" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "email_verification" ADD CONSTRAINT "FK_3f5b6a9a711f4432db0b330a9de" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление внешних ключей
    await queryRunner.query(
      `ALTER TABLE "email_verification" DROP CONSTRAINT "FK_3f5b6a9a711f4432db0b330a9de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_d0a9e330a1c2195db288b1c9d76"`,
    );

    // Удаление таблиц
    await queryRunner.query(`DROP TABLE "email_verification"`);
    await queryRunner.query(`DROP TABLE "painting_services"`);
    await queryRunner.query(`DROP TYPE "public"."painting_services_type_enum"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "details"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "workers"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

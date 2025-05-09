import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async findByUsername(username: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { username } });
  }

  async validateAdmin(loginAdminDto: LoginAdminDto): Promise<Admin> {
    const admin = await this.findByUsername(loginAdminDto.username);

    if (!admin) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Проверяем, активирован ли аккаунт
    if (!admin.isActive) {
      throw new UnauthorizedException('Аккаунт деактивирован');
    }

    const isPasswordValid = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    return admin;
  }

  async login(loginAdminDto: LoginAdminDto) {
    const admin = await this.validateAdmin(loginAdminDto);

    // Обновляем время последнего входа
    admin.lastLoginAt = new Date();
    await this.adminRepository.save(admin);

    const payload = {
      username: admin.username,
      sub: admin.id,
      isSuperAdmin: admin.isSuperAdmin,
      permissions: admin.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.fullName,
        isSuperAdmin: admin.isSuperAdmin,
        permissions: admin.permissions,
      },
    };
  }
}

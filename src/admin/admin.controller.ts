import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Patch,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtAdminAuthGuard } from './guards/jwt-admin-auth.guard';
import { AdminUser } from './decorator/admin-user.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('profile')
  getProfile(@AdminUser() admin) {
    return admin;
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }
}

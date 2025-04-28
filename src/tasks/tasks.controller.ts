import { Controller, Get, Post, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findOne(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string): Promise<void> {
        return this.tasksService.remove(+id);
    }
}
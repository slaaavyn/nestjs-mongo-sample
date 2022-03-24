import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RolesEnum } from './roles.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'User creation endpoint' })
  @ApiResponse({ status: 200, type: User })
  public create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Getting a list of all users' })
  @ApiResponse({ status: 200, type: [User] })
  public getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}

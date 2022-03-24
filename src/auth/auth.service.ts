import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);
    return new AuthResponseDto(user, await this.generateToken(user));
  }

  public async registration(authDto: AuthDto): Promise<AuthResponseDto> {
    const candidate = await this.userService.getUserByEmail(authDto.email);
    if (candidate) {
      throw new HttpException(
        `User with email: ${authDto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(authDto.password, 5);
    const user = await this.userService.createUser({
      ...authDto,
      password: hashPassword,
    });
    const token = await this.generateToken(user);

    return new AuthResponseDto(user, token);
  }

  private async validateUser(authDto: AuthDto): Promise<User> {
    const user = await this.userService.getUserByEmail(authDto.email);
    if (!user) {
      throw new HttpException(
        `User with email: ${authDto.email} is not exist`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPassValid = await bcrypt.compare(authDto.password, user.password);
    if (!isPassValid) {
      throw new HttpException(
        `User password is invalid`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  private async generateToken(user: User) {
    const payload = { id: user._id, email: user.email, roles: user.roles };
    return this.jwtService.sign(payload);
  }
}

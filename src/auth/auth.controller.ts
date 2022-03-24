import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('/registration')
  public registration(@Body() authDto: AuthDto) {
    return this.authService.registration(authDto);
  }
}

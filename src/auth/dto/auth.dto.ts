import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'must be correct email' })
  public email: string;

  @IsString({ message: 'must be a string' })
  @ApiProperty({ example: 'user_password' })
  public password: string;
}

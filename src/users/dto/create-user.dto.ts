import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'must be correct email' })
  @ApiProperty({ example: 'user@domain.com' })
  readonly email: string;

  @IsString({ message: 'must be a string' })
  @ApiProperty({ example: 'user_password' })
  readonly password: string;
}

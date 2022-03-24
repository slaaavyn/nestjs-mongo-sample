import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.model';

export class AuthResponseDto {
  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  @ApiProperty({ example: 'User{ \n... \n... \n}' })
  public user: User;

  @ApiProperty({
    example: 'asdasdigfhweiohequihfrwehif',
    description: 'jwt token',
  })
  public token: string;
}

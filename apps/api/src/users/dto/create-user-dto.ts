import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  readonly last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  readonly email: string;

  @ApiProperty({
    example: 'john.doe',
    description: 'The unique username of the user.',
  })
  readonly username: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the user.',
  })
  readonly password: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user.',
  })
  readonly date_of_birth: Date;

  @ApiProperty({
    example: 'A short bio about the user.',
    description: 'A brief description of the user.',
  })
  readonly about: string;
}

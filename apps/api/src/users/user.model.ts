import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  date_of_birth: Date;
  about?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'john.doe',
    description: 'The unique username of the user.',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the user.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'Salt of the password',
    description: 'The salt used for password hashing.',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  salt: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date_of_birth: Date;

  @ApiProperty({
    example: 'A short bio about the user.',
    description: 'A brief description of the user.',
  })
  @Column({
    type: DataType.STRING,
  })
  about: string;

  @ApiProperty({
    example: '/data/random_name.png',
    description: 'The filepath to the profile picture of the user.',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  profile_picture: string;

  @ApiProperty({
    example: '943712',
    description: 'The verification code of the user.',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  verification_code: string;

  @ApiProperty({
    example: true,
    description: 'The user is verified or not.',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_verified: boolean;
}

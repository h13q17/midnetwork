import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

async function genUniqueSalt(userRepository: typeof User) {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  while (true) {
    const collision = await userRepository.findOne({
      where: { salt: salt },
    });
    if (collision) {
      salt = await bcrypt.genSalt(saltRounds);
    } else {
      return salt;
    }
  }
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUserById(id: number): Promise<User> {
    const user = this.userRepository.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const salt = await genUniqueSalt(this.userRepository);
    const password = await bcrypt.hash(dto.password, salt);

    const updatedDto = {
      ...dto,
      password: password,
      salt: salt,
    };

    try {
      const user = await this.userRepository.create(updatedDto);
      return user;
    } catch (error) {
      if (error.errors) {
        for (const validationError of error.errors) {
          if (validationError.type === 'unique violation') {
            if (validationError.path === 'email') {
              throw new HttpException(
                'Email is already in use',
                HttpStatus.BAD_REQUEST,
              );
            } else if (validationError.path === 'username') {
              throw new HttpException(
                'Username is already in use',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        }
      }
    }
  }
}

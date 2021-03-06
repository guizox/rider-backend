import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { password, email } = authCredentialsDTO;

    const salt = await bcrypt.genSalt();

    const user = new User();

    user.salt = salt;
    user.password = await this.hashPassowrd(password, user.salt);
    user.email = email;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassowrd(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    const { email, password } = authCredentialsDTO;

    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      null;
    }
  }
}

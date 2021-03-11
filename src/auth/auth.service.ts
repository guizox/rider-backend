import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JWTPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken }> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JWTPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT token for the user ${authCredentialsDTO.email}`,
    );

    return { accessToken };
  }
}

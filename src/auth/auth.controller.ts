import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCrendentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCrendentialsDTO);
  }

  @Post('/sign-in')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken }> {
    return this.authService.signIn(authCredentialsDTO);
  }
}

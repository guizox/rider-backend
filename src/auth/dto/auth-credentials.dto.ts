import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must include at least an upper letter and a special caracter.',
  })
  password: string;

  @IsEmail()
  email: string;
}

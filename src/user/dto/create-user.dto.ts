import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/enum/role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'O email é inválido' })
  @Matches(/^[a-z][a-zA-Z0-9_]*@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/, {
    message: ' O email deve iniciar com letra minúscula',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  passwordConfirmation: string;

  @IsString()
  name: string;

  @IsEnum(UserRole, { message: 'A role é inválida' })
  @IsString()
  role: string | UserRole = UserRole.ClientUser;
}

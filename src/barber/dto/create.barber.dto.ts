import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/database/dto/create-address';
import { CreateServiceDto } from 'src/database/dto/create-services';
import { UserRole } from 'src/enum/role.enum';

export class CreateBarberDto {
  @IsEmail({}, { message: 'O email é inválido' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  passwordConfirmation: string;

  @IsString()
  name: string;

  @IsOptional()
  avatar: string;

  /* @IsString()
  services: string; */

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsEnum(UserRole, { message: ' A role é invalida' })
  @IsString()
  role: string | UserRole = UserRole.BarberUser;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;

  @ValidateNested()
  @Type(() => CreateServiceDto)
  services: CreateServiceDto[];
}

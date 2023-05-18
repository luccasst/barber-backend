import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/database/dto/create-address';

export class CreateUserClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  @IsUrl()
  urlPhoto: string;

  // fazer validação
  @IsOptional()
  @IsString()
  cpf: string;

  // 8 digitos
  // dando erro, procurar como fazer
  // @IsPhoneNumber('BR')
  @IsOptional()
  @IsString()
  phoneNumber: string;

  // @IsMobilePhone('pt-BR')
  // dando err; procurar como fazer
  @IsString()
  @IsOptional()
  cellphoneNumber: string;

  // @ValidateNested()
  // @IsOptional()
  // @Type(() => CreateAddressDto)
  // address: CreateAddressDto;

  // precisa fazer verificação igual fizemos nO MIDDLEWARE de roles
  @IsString()
  role: string;
}

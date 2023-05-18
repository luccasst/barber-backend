import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from 'src/database/dto/update-address';

export class UpdateClientUserDto extends UpdateAddressDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsUrl()
  @IsOptional()
  urlPhoto: string;

  // fazer validação
  @IsString()
  @IsOptional()
  cpf: string;

  // 8 digitos
  // dando erro, procurar como fazer
  // @IsPhoneNumber('BR')
  @IsString()
  @IsOptional()
  phoneNumber: string;

  // @IsMobilePhone('pt-BR')
  // dando err; procurar como fazer
  @IsString()
  @IsOptional()
  cellphoneNumber: string;

  // precisa fazer verificação igual fizemos nO MIDDLEWARE de roles
  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  password: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;
}

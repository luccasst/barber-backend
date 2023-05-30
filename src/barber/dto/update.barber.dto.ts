import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from 'src/database/dto/update-address';
import { UpdateServiceDto } from 'src/database/dto/update-services';

export class UpdateBarberDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  avatar: string;

  /* @IsArray()
  @IsOptional()
  @IsString({ each: true })
  services: string; */

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;

  @IsArray()
  @ValidateNested({ each: true }) // Validação para cada objeto do array
  @Type(() => UpdateServiceDto)
  services: UpdateServiceDto[];
}

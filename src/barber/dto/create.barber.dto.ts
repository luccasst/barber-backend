import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/database/dto/create-address';
import { CreateServiceDto } from 'src/database/dto/create-services';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsOptional()
  avatar: string;

  /* @IsString()
  services: string; */

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;

  @IsArray()
  @ValidateNested({ each: true }) // Validação para cada objeto do array
  @Type(() => CreateServiceDto)
  services: CreateServiceDto[];
}

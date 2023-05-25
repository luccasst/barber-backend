import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/database/dto/create-address';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsOptional()
  avatar: string;

  @IsString()
  services: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;
}

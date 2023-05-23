import { IsOptional, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsOptional()
  avatar: string;

  @IsString()
  services: string;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;
}

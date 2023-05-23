import { IsOptional, IsString } from 'class-validator';

export class UpdateBarberDto {
  @IsString()
  name: string;

  @IsOptional()
  avatar: string;

  @IsString()
  service: string;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;
}

import { IsString, IsNumber } from 'class-validator';
import { ServicesBarber } from '../entities/services.entity';

export class CreateServiceDto extends ServicesBarber {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}

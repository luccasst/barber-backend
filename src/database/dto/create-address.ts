import { IsString, Length } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateAddressDto extends Address {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  city: string;

  @IsString()
  @Length(2, 2)
  state: string;

  @IsString()
  country: string;
}

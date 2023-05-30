import { IsIn, IsString, Length, IsISO31661Alpha2 } from 'class-validator';
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
  @IsIn([
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ])
  @Length(2, 2)
  state: string;

  @IsString()
  @IsISO31661Alpha2()
  country: string;
}

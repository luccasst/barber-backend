import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateServiceDto } from './create-services';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

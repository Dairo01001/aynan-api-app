import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsPhoneNumber,
  MinLength,
  IsInt,
} from 'class-validator';

export class CreateEpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  taxId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  legalName: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  commercialName: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  portfolioEmail: string;

  @IsString()
  @IsPhoneNumber()
  @ApiProperty()
  portfolioPhone: string;

  @IsString()
  @ApiProperty()
  contactName: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  contactPosition: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  paymentTermDays: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsPhoneNumber,
  MinLength,
  IsInt,
  IsOptional,
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
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ required: false })
  commercialName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  portfolioEmail?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('CO')
  @ApiProperty({ required: false })
  portfolioPhone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contactName?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @ApiProperty({ required: false })
  contactPosition?: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  paymentTermDays: number;
}

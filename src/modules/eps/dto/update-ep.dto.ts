import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEpDto } from './create-ep.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEpsDto extends PartialType(CreateEpDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  isActive?: boolean;
}

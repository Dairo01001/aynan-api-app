import { PartialType } from '@nestjs/swagger';
import { CreateEpDto } from './create-ep.dto';
import { IsBoolean } from 'class-validator';

export class UpdateEpDto extends PartialType(CreateEpDto) {
  @IsBoolean()
  isActive: boolean;
}

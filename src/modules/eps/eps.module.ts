import { Module } from '@nestjs/common';
import { EpsService } from './eps.service';
import { EpsController } from './eps.controller';

@Module({
  controllers: [EpsController],
  providers: [EpsService],
})
export class EpsModule {}

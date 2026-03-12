import { Module } from '@nestjs/common';
import { EpsService } from './eps.service';
import { EpsController } from './eps.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EpsController],
  providers: [EpsService],
  imports: [PrismaModule],
})
export class EpsModule { }

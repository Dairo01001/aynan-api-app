import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { EpsService } from './eps.service';
import { EpsEntity } from './entities/ep.entity';
import { CreateEpDto } from './dto/create-ep.dto';
import { UpdateEpsDto } from './dto/update-ep.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('eps')
@ApiTags('Eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: EpsEntity })
  async create(@Body() createEpDto: CreateEpDto) {
    const createdEps = await this.epsService.createEps(createEpDto);
    return new EpsEntity(createdEps);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [EpsEntity] })
  async findAll() {
    const eps = await this.epsService.findAllEps({
      where: { isActive: true },
    });
    return eps.map((ep) => new EpsEntity(ep));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EpsEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const eps = await this.epsService.findOneEps({ id });
    if (!eps) {
      throw new NotFoundException(`Eps with id ${id} not found`);
    }
    return new EpsEntity(eps);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EpsEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEpsDto: UpdateEpsDto,
  ) {
    const updatedEps = await this.epsService.updateEps({
      where: { id },
      data: updateEpsDto,
    });
    return new EpsEntity(updatedEps);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EpsEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const deletedEps = await this.epsService.removeEps({ id });
    return new EpsEntity(deletedEps);
  }
}

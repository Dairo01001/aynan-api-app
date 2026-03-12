import { Injectable } from '@nestjs/common';
import { CreateEpDto } from './dto/create-ep.dto';
import { UpdateEpDto } from './dto/update-ep.dto';
import { Eps, Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EpsService {
  constructor(private readonly prisma: PrismaService) { }

  createEps(data: CreateEpDto): Promise<Eps> {
    return this.prisma.eps.create({ data });
  }

  findAllEps(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EpsWhereUniqueInput;
    where?: Prisma.EpsWhereInput;
    orderBy?: Prisma.EpsOrderByWithRelationInput;
  }): Promise<Eps[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.eps.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOneEps(
    epsWhereUniqueInput: Prisma.EpsWhereUniqueInput,
  ): Promise<Eps | null> {
    return this.prisma.eps.findUnique({
      where: epsWhereUniqueInput,
    });
  }

  updateEps(params: {
    where: Prisma.EpsWhereUniqueInput;
    data: UpdateEpDto;
  }): Promise<Eps> {
    const { where, data } = params;
    return this.prisma.eps.update({
      data,
      where,
    });
  }

  removeEps(where: Prisma.EpsWhereUniqueInput): Promise<Eps> {
    return this.prisma.eps.update({
      where,
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }
}

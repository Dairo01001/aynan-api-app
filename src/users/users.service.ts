import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = process.env.ROUNDS_OF_HASHING
  ? parseInt(process.env.ROUNDS_OF_HASHING, 10)
  : 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await bcrypt.hash(data.password, roundsOfHashing);

    return this.prisma.user.create({
      data,
    });
  }

  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, roundsOfHashing);
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      where,
      data: {
        active: false,
        deletedAt: new Date(),
      },
    });
  }
}

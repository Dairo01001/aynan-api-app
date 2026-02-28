import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/generated/prisma/client';

export class RoleEntity implements Role {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}

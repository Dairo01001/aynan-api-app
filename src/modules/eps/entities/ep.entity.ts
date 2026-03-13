import { ApiProperty } from '@nestjs/swagger';
import { Eps } from 'src/generated/prisma/client';

export class EpsEntity implements Eps {
  constructor(partial: Partial<EpsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  taxId: string;

  @ApiProperty()
  legalName: string;

  @ApiProperty()
  commercialName: string | null;

  @ApiProperty()
  portfolioEmail: string | null;

  @ApiProperty()
  portfolioPhone: string | null;

  @ApiProperty()
  contactName: string | null;

  @ApiProperty()
  contactPosition: string | null;

  @ApiProperty()
  paymentTermDays: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdById: string | null;

  @ApiProperty()
  updatedById: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}

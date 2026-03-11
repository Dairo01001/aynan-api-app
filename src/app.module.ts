import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { EpsModule } from './modules/eps/eps.module';
import { InvoicesModule } from './modules/invoices/invoices.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    RolesModule,
    AuthModule,
    EpsModule,
    InvoicesModule,
  ],
  providers: [],
})
export class AppModule { }

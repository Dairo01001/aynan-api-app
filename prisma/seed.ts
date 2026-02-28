import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from 'src/users/users.service';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  const admin = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
    },
  });

  const hashedPassword = await bcrypt.hash('admin1234', roundsOfHashing);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'admin',
      fullName: 'admin',
      roleId: admin.id,
      email: 'admin@gmail.com',
      password: hashedPassword,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    Logger.error('Error seeding database', e);
    await prisma.$disconnect();
    process.exit(1);
  });

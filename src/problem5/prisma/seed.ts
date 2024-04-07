import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.car.createMany({
    data: [
      {
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
      },
      {
        make: 'Honda',
        model: 'Civic',
        year: 2021,
      },
      {
        make: 'Ford',
        model: 'Mustang',
        year: 2020,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
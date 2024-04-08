import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const carsData = [
    { make: 'Toyota', model: 'Camry', year: 2022 },
    { make: 'Toyota', model: 'Corolla', year: 2021 },
    { make: 'Honda', model: 'Civic', year: 2020 },
    { make: 'Honda', model: 'Accord', year: 2019 },
    { make: 'Ford', model: 'Mustang', year: 2018 },
    { make: 'Ford', model: 'Fusion', year: 2020 },
    { make: 'Tesla', model: 'Model S', year: 2023 },
    { make: 'Tesla', model: 'Model 3', year: 2022 },
    { make: 'BMW', model: 'X5', year: 2021 },
    { make: 'BMW', model: '3 Series', year: 2019 },
    { make: 'Chevrolet', model: 'Silverado', year: 2018 },
    { make: 'Chevrolet', model: 'Camaro', year: 2019 },
    { make: 'Mercedes-Benz', model: 'C-Class', year: 2019 },
    { make: 'Mercedes-Benz', model: 'E-Class', year: 2020 },
    { make: 'Audi', model: 'A4', year: 2020 },
    { make: 'Audi', model: 'Q5', year: 2021 },
    { make: 'Subaru', model: 'Outback', year: 2022 },
    { make: 'Subaru', model: 'Forester', year: 2019 },
    { make: 'Nissan', model: 'Altima', year: 2019 },
    { make: 'Nissan', model: 'Maxima', year: 2020 },
    { make: 'Volkswagen', model: 'Jetta', year: 2021 },
    { make: 'Volkswagen', model: 'Passat', year: 2020 },
  ];

  // Shuffle the order of cars
  const shuffledCarsData = carsData.sort(() => Math.random() - 0.5);

  await prisma.car.createMany({ data: shuffledCarsData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
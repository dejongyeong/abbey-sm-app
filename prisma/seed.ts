import { prisma } from '../src/lib/prisma/db';

async function seed() {
  try {
    await prisma.role.createMany({
      data: [
        { name: 'Admin', descr: 'AM Administrator', alias: 'am-admin' },
        { name: 'Manager', descr: 'AM Manager', alias: 'am-manager' },
        {
          name: 'Production Team',
          descr: 'AM Production Team',
          alias: 'am-prod-team',
        },
        {
          name: 'Service Team',
          descr: 'AM Service Team',
          alias: 'am-service-team',
        },
        { name: 'Dealership', descr: 'Dealership', alias: 'dealership' },
        { name: 'Farm Manager', descr: 'Farm Manager', alias: 'farm-manager' },
        { name: 'Farmer', descr: 'Farmer', alias: 'farmer' },
      ],
    });

    await prisma.machineType.createMany({
      data: [
        { name: 'Tanker', alias: 'tanker' },
        { name: 'Feeder', alias: 'feeder' },
      ],
    });

    console.log('Role and machine type seeded successfully');
  } catch (error) {
    console.error('Failed to create seed data: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

import { PrismaClient } from '@prisma/client';

// Create a new instance of the prisma client
const prisma = new PrismaClient();

/**
 * Main function which kicks off the seeding of the database
 */
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'msp.admin@localhost' },
    update: {},
    create: {
      first_name: 'MSP',
      last_name: 'Admin',
      user_name: 'msp.admin@localhost',
      email: 'msp.admin@localhost',
      is_active: true,
      is_email_verified: true,
      is_msp: true,
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$Lo2BXKlFwYpvd69ZIyqN1A$H/Rak2mdGR2CHbJRuHIrUzcXa8xJ8TViiUOB5/P2kCI',
      owned_tenants: {
        create: [
          {
            name: 'public',
            description: 'Public Tenant',
            is_public: true,
          },
          {
            name: 'Streamline Partners',
            description: 'Streamline Partners customer tenant',
            is_public: false,
          },
        ],
      },
    },
  });

  console.log({ admin });
}

/**
 * Main Function
 */
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

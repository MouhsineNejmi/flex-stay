const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const mouhsine = await prisma.user.upsert({
    where: { email: 'mouhsine@flexstay.com' },
    update: {},
    create: {
      email: 'mouhsine@flexstay.com',
      username: 'Mouhsine',
      role: 'admin',
      password: bcrypt.hashSync('test1234', 12),
    },
  });

  console.log({ mouhsine });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

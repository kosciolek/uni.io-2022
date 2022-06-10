const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const VERIFY_PERCENT = 0.25;

const random = (min, max) => min + Math.floor(Math.random() * (max - min));

(async () => {
  const count = await client.post.count();

  for (let i = 0; i < count * VERIFY_PERCENT; i++) {
    const id = random(1, count - 1);

    console.info(`Verifying ${id}`);

    await client.post.update({
      where: {
        id,
      },
      data: {
        verified: true,
      },
    });
  }
})();

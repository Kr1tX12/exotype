// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fillSlugs() {
  const users = await prisma.user.findMany({
    where: { slug: null },
  });

  for (const user of users) {
    const slug = user.email.split("@")[0];
    await prisma.user.update({
      where: { id: user.id },
      data: { slug },
    });
    console.log(`Заполнен slug для ${user.id}: ${slug}`);
  }
}

fillSlugs()
  .catch((e) => console.error("Ошибка:", e))
  .finally(() => prisma.$disconnect());

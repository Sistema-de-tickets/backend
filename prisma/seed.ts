import "dotenv/config";
import { prisma } from "../src/config/prisma";

async function main() {
  await prisma.roles.createMany({
    data: [{ name: "admin" }, { name: "agente" }, { name: "empleado" }],
    skipDuplicates: true,
  });

  await prisma.areas.createMany({
    data: [
      { name: "Soporte", description: "Área de soporte técnico" },
      { name: "Sistemas", description: "Área de sistemas e infraestructura" },
    ],
    skipDuplicates: true,
  });

  const roles = await prisma.roles.findMany();
  const areas = await prisma.areas.findMany();

  console.log("Roles:", roles);
  console.log("Areas:", areas);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

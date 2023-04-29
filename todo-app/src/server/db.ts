// import { PrismaClient } from "@prisma/client";
// const PrismaClient = require('@prisma/client')

// const { env } = require("~/env.mjs");
// const prisma = new PrismaClient({
//   log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // await prisma.task.create({
  //   data:{
  //     title:"hello there 2",
  //     description:"aaa sda asd asd asd ",
  //     status:"done"
  //   }
  // })
  const allTasks = await prisma.task.findMany();
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

module.exports = { prisma };

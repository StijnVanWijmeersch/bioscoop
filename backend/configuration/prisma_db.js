const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {};

main()
.then(async () => await prisma.$disconnect())
.catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
})

module.exports = prisma;
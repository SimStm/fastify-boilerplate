import { PrismaClient } from '@prisma/client'
import pino from 'pino'

const logger = pino({ name: 'VHC-Sync' })
const prisma = new PrismaClient()

async function main() {
  logger.info(`--- Starting...`)

  logger.info(`--- Searching all users in database...`)
  const allUsers = await prisma.users.findMany()
  logger.info(`--- Total Users found: ${allUsers.length}`)

  logger.info(`--- Searching all products...`)
  const allProducts = await prisma.products.findMany()
  logger.info(`--- Total Products found: ${allProducts.length}`)

  logger.info(`--- Searching all users with products included...`)
  const allUsersPlusProducts = await prisma.users.findMany({
    include: { products: true }
  })
  logger.info(`--- Total Resource Values found: ${allUsersPlusProducts.length}`)
}

main()
  .catch((e) => {
    logger.error(
      e,
      `--- [ERROR] An error occurred, please check the logs for more details`
    )
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

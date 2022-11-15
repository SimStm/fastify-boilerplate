import { Prisma, PrismaClient } from '@prisma/client'

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.users.findMany({ include: { products: true } })
}

export const getUser = async (prisma: PrismaClient, id: string) => {
  return await prisma.users.findUnique({
    where: { id: id },
    include: { products: true }
  })
}

import { Prisma, PrismaClient } from '@prisma/client'

export const getAllProducts = async (prisma: PrismaClient) => {
  return await prisma.products.findMany({ include: { user: true } })
}

export const getProduct = async (prisma: PrismaClient, id: string) => {
  return await prisma.products.findUnique({
    where: { id: id },
    include: { user: true }
  })
}

export const createProduct = async (
  prisma: PrismaClient,
  dbItem: Prisma.productsCreateInput
) => {
  return await prisma.products.create({
    data: dbItem
  })
}

export const patchProduct = async (
  prisma: PrismaClient,
  id: string,
  dbItem: Prisma.productsUpdateInput
) => {
  return await prisma.products.update({
    where: { id: id },
    data: dbItem
  })
}

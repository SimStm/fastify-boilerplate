import { Prisma, PrismaClient } from '@prisma/client'
import md5 from 'md5'

export const getUserFromAuth = async (
  prisma: PrismaClient,
  email: string,
  password: string
) => {
  return await prisma.users.findFirst({
    where: {
      email: email,
      password: md5(password)
    }
  })
}

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.users.findMany({ include: { products: true } })
}

export const getUser = async (prisma: PrismaClient, id: string) => {
  return await prisma.users.findUnique({
    where: { id: id },
    include: { products: true }
  })
}

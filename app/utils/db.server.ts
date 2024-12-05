import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const createUser = async (name: string | null, email: string, passwordHash: string): Promise<Promise<
  | { id: string; name: string | null; email: string; password: string; createAt: Date; updateAt: Date }
  | { error: string; status: number }
>> => {
  try {
    return prisma.user.create({
      data: { name, email, password: passwordHash }
    });
  } catch (error) {
    return { error: "something error", status: 400 }
  }
}

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  });
}


export const getUsers = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
    },
  });
}


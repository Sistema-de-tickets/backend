import { Prisma } from "@prisma/client";

export const userInclude = {
  roles: { select: { id: true, name: true } },
  areas: { select: { id: true, name: true } },
  users: { select: { email: true } },
} satisfies Prisma.public_usersInclude;

export type UserWithRelations = Prisma.public_usersGetPayload<{
  include: typeof userInclude;
}>;

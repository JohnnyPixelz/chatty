"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  chatId: zfd.text(),
  message: zfd.text(),
});

export async function handleMessageSend(state: boolean, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return true;

  const parse = schema.safeParse(formData);
  if (!parse.success) return true;

  const { chatId, message } = parse.data;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    include: {
      friendships1: {
        where: {
          id: chatId
        }
      },
      friendships2: {
        where: {
          id: chatId
        }
      }
    }
  });

  if (!user) return true;

  const friendshipExists = user.friendships1.length > 0 || user.friendships2.length > 0;
  if (!friendshipExists) return true;

  await prisma.message.create({
    data: {
      content: message,
      friendshipId: chatId,
      senderId: session.user.id
    }
  });

  revalidatePath("/");

  return true;
}
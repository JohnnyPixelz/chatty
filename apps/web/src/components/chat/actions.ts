"use server";

import { auth } from "@/auth";

export async function handleSendMessage(previousState: boolean, formData: FormData) {
  const session = await auth();

  if (!session) return false;

  console.log(session);
  console.log(formData);

  return true;
}
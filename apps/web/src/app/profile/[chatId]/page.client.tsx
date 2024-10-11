"use client";

import { Input } from "@/components/ui/input";
import { handleMessageSend } from "./page.actions";
import { LoaderIcon, SendHorizonal } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";

export function MessageBox({ chatId }: { chatId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<boolean, FormData>(
    handleMessageSend,
    false
  );

  if (formRef.current && state) {
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={formAction}>
      <div className="flex flex-row items-center gap-3 p-3 border-t rounded-t-3xl">
        <input type="hidden" name="chatId" value={chatId} />
        <Input className="rounded-full p-4" name="message" />
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="rounded-full bg-black text-white p-2">
      {pending ? <LoaderIcon /> : <SendHorizonal />}
    </button>
  )
}
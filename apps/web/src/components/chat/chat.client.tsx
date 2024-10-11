"use client";

import { IMessage } from "@/data";
import { Message } from "./chatty";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { handleSendMessage } from "./chat.server";
import { Input } from "../ui/input";
import { Mic2, Send, Video } from "lucide-react";
import { Button } from "../ui/button";

export const ChatHeader = ({ name }: { name: string }) => {
  return (
    <div className="p-4 border-b flex flex-row justify-between items-center">
      <p className="text-2xl font-medium">{name}</p>
      <div className="flex flex-row">
        <Button variant={"ghost"}>
          <Mic2 className="text-indigo-500 animate-pulse transition-all" />
        </Button>
        <Button variant={"ghost"}>
          <Video className="text-indigo-500 animate-pulse transition-all" />
        </Button>
      </div>
    </div>
  )
}

export const ChatArea = ({ messages, className }: { messages: IMessage[], className?: string }) => {
  return (
    <div className="overflow-y-auto h-full flex flex-col-reverse">
      <div className={cn('flex flex-col-reverse gap-6 p-3 flex-grow', className)}>
        {messages.toReversed().map((message, key) => (
          <Message message={message} key={key} />
        ))}
      </div>
    </div>
  )
}

export const ChatBox = ({ chatId }: { chatId: string }) => {
  const [state, formAction] = useFormState<boolean, FormData>(
    handleSendMessage,
    false
  );

  const formRef = useRef<HTMLFormElement>(null);

  // const { pending } = useFormStatus();

  if (formRef.current && state) {
    formRef.current.reset();
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className='border-t p-4 flex gap-3'
    >
      <input className="hidden" type="text" name="chatId" defaultValue={chatId} />
      <Input
        name="message"
        placeholder="Type a message..."
      />
      <Button>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
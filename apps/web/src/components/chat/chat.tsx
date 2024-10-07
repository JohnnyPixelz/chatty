"use client";

import { IMessage } from "@/data";
import { Message } from "./chatty";
import { cn } from "@/lib/utils";

export function Chat({ messages, className }: { messages: IMessage[], className?: string }) {

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
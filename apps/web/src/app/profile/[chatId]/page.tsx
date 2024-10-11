import { auth } from "@/auth";
import { fetchFriendship } from "@/lib/friends";
import { cn } from "@/lib/utils";
import { ChevronLeft, Phone, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MessageBox } from "./page.client";
import Image from "next/image";

// const messages = [
//   { self: false, content: "Hey brother" },
//   { self: true, content: "Wassup" },
//   { self: true, content: "What is it" },
//   { self: false, content: "I'm back home ready to fire up my xbox" },
//   { self: false, content: "Wanna hop on?" },
//   { self: true, content: "Sure call me on discord" },
//   { self: false, content: "Hey brother" },
//   { self: true, content: "Wassup" },
//   { self: true, content: "What is it" },
//   { self: false, content: "I'm back home ready to fire up my xbox" },
//   { self: false, content: "Wanna hop on?" },
//   { self: true, content: "Sure call me on discord" },
//   { self: false, content: "Hey brother" },
//   { self: true, content: "Wassup" },
//   { self: true, content: "What is it" },
//   { self: false, content: "I'm back home ready to fire up my xbox" },
//   { self: false, content: "Wanna hop on?" },
//   { self: true, content: "Sure call me on discord" },
// ]

export default async function Page({ params: { chatId } }: { params: { chatId: string } }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const friendship = await fetchFriendship(chatId);
  if (!friendship) {
    redirect("/profile");
  }

  const messages = friendship.messages.map((message) => ({
    self: message.senderId == session.user?.id,
    content: message.content,
    sentAt: message.sentAt,
    sender: message.sender,
  }));

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex items-center">
        <div className="flex flex-row items-center gap-2 pr-3 bg-white rounded-tr-[2.5rem] basis-3/4 h-20">
          <Link href={"/profile"}>
            <ChevronLeft size={32} />
          </Link>
          <div className="flex flex-row items-center gap-2">
            <div className={cn("h-10 w-10 rounded-full", friendship.friend.image || "bg-zinc-600")}>
              {friendship.friend.image && <Image src={friendship.friend.image} alt={`${friendship.friend.name} profile picture`} width={64} height={64} />}
            </div>

            <div className="flex flex-col">
              <p className="font-bold">{friendship.friend.name}</p>
              <p className="text-sm text-zinc-400">Online</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex flex-row gap-4 p-6 rounded-bl-[2.5rem] items-center basis-1/4 bg-black h-20">
            <Video color="white" size={28} />
            <Phone color="white" size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white h-full rounded-tr-[2.5rem] overflow-hidden">
        <div className="h-full px-2 overflow-y-auto gap-1 pt-8 pb-4 flex flex-col-reverse">
          {messages.toReversed().map((message, key) => (
            <div tabIndex={key} key={key} className={cn("group", message.self ? "self-end" : "self-start")}>
              <div className={cn("p-2 rounded-2xl w-fit", message.self ? "rounded-tr-none bg-black text-white" : "rounded-tl-none bg-white text-black border")}>
                <p>{message.content}</p>
              </div>
              <p className={cn("hidden group-focus:block", message.self ? "text-right" : "text-left")}>11:42 AM</p>
            </div>
          ))}
          <p className="text-zinc-500 text-xs self-center">Today</p>
        </div>
        <MessageBox chatId={chatId} />
      </div>
    </div>
  )
}
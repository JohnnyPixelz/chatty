import { friends, IFriend, IMessage } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bolt } from "lucide-react";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function Chatty({ chatId }: { chatId?: string }) {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email
    }
  });

  if (!user) {
    redirect("/");
  }

  // const friendship = await prisma.friendship.findFirst({
  //   where: {
  //     OR: [
  //       { user1Id: user?.id },
  //       { user2Id: user?.id },
  //     ],
  //     id: chatId
  //   },
  //   include: {
  //     messages: true,
  //     user1: true,
  //     user2: true
  //   }
  // });

  // const otherUser = user.id == friendship.user1.id ? friendship.user2 : friendship.user1;

  // const messages = friendship.messages;

  return (
    <div className="h-screen flex flex-row">

      {/* Left Tab */}
      <div id="sidebar" className="hidden relative sm:block sm:w-[250px] md:w-[300px] lg:w-[400px] border-r">
        <div className="p-6 border-b">
          <p className="text-2xl font-medium">Friends</p>
        </div>

        <div className="p-2">
          {friends.map((friend, key) => (
            <Friend friend={friend} selected={friend.id.toString() == chatId} key={key} />
          ))}
        </div>

        <div className="border-t p-3 absolute bottom-0 w-full">
          <Button className="w-full" variant={"ghost"}>
            <Bolt />
          </Button>
        </div>
      </div>

      {/* Main Area aka chat */}
      {/* {selectedFriend && chatId
        ? (
          <div className='flex flex-col justify-end flex-grow h-full'>
            <ChatHeader name={selectedFriend?.name} />

            <ChatArea className="chat-background bg-repeat" messages={messages} />

            <ChatBox chatId={chatId} />
          </div>
        )
        : (
          <div className="flex items-center justify-center flex-grow">
            <p className="text-lg"></p>
          </div>
        )
      } */}

    </div >
  );
};

export function Message({ message }: { message: IMessage }) {
  const { senderId, text, timestamp } = message;

  const ownMessage = senderId == 0;

  return (
    <div className={cn("flex gap-2", ownMessage ? "flex-row-reverse" : "flex-row")}>
      <Avatar />
      <div className={cn("p-3 rounded-lg flex flex-col gap-1", ownMessage ? "bg-blue-500" : "bg-gray-200")}>
        <p className={cn('text-lg', ownMessage ? "text-white" : "text-black")}>{text}</p>
        <p className={cn('text-xs', ownMessage ? "text-gray-200" : "text-gray-500")}>{timestamp}</p>
      </div>
    </div>
  )
}

export function Friend({ friend, selected = false }: { friend: IFriend, selected?: boolean }) {
  const { name, lastMessage } = friend;

  return (
    <Link className="block" href={`/profile/${friend.id}`}>
      <div className={cn('flex flex-row gap-2 rounded-lg p-3', selected && "bg-gray-100")}>
        <Avatar />
        <div className='flex flex-col'>
          <p className='text-zinc-900 text-lg font-medium'>{name}</p>
          <p className='text-zinc-500 text-sm truncate max-w-36 md:max-w-48 lg:max-w-80'>{lastMessage}</p>
        </div>
      </div>
    </Link>
  )
}

export function Avatar({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-full h-12 w-12 bg-zinc-900", className)}></div>
  )
}
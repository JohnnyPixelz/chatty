import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFriendships, getPendingReceivedFriendRequests, getPendingSentFriendRequests } from "@/lib/friends";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function Page() {
  const friendships = await fetchFriendships();

  const receivedFriendRequests = await getPendingReceivedFriendRequests();
  const sentFriendRequests = await getPendingSentFriendRequests();

  return (
    <div className="h-screen flex flex-col">
      <div className="h-20 absolute flex items-center">
        <Link href={"/profile"}>
          <ChevronLeft size={32} />
        </Link>
      </div>

      <div className="h-20 absolute right-2 flex items-center">
        <Link href={"/profile/friends/search"}>
          <Plus size={32} />
        </Link>
      </div>

      <div className="p-6">
        <p className="text-center text-2xl font-bold">Friends</p>
      </div>

      <Tabs defaultValue="friends" className="h-full">
        <TabsList className="flex flex-row gap-3">
          <TabsTrigger value="friends" className="rounded-full">Friends</TabsTrigger>
          <TabsTrigger value="requests" className="rounded-full">Requests</TabsTrigger>
        </TabsList>
        <div className="rounded-t-[2rem] bg-black h-full">

          <TabsContent value="friends" className="p-6">
            <div className="flex flex-col gap-6">
              {friendships.map((friendship, key) => (
                <Link href={`/profile/${friendship.friendshipId}`} key={key} className="flex flex-row gap-3">
                  <div className={cn("h-14 w-14 rounded-full", friendship.friend.image || "bg-zinc-600")}>
                    {friendship.friend.image && <Image src={friendship.friend.image} alt={`${friendship.friend.name} profile picture`} width={64} height={64} />}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white font-medium">{friendship.friend.name}</p>
                    <p className="text-zinc-300 text-sm">{friendship.messages.length === 0 ? "No messages yet" : friendship.messages.reduce((latest, current) => latest.sentAt > current.sentAt ? latest : current).content}</p>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="p-6">
            {receivedFriendRequests.length == 0
              ? (
                <p className="text-zinc-200 font-medium">No Incoming Requests</p>
              ) : (
                <p className="text-zinc-200 font-medium">Incoming Requests</p>
              )
            }
            <div className="flex flex-col gap-6">
              {receivedFriendRequests.map((friendship, key) => (
                <Link href={`/profile/${friendship.friendshipId}`} key={key} className="flex flex-row gap-3">
                  <div className={cn("h-14 w-14 rounded-full", friendship.friend.image || "bg-zinc-600")}>
                    {friendship.friend.image && <Image src={friendship.friend.image} alt={`${friendship.friend.name} profile picture`} width={64} height={64} />}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white font-medium">{friendship.friend.name}</p>
                  </div>
                </Link>
              ))}
            </div>

            {sentFriendRequests.length == 0
              ? (
                <p className="text-zinc-200 font-medium mt-8">No Outgoing Requests</p>
              ) : (
                <p className="text-zinc-200 font-medium mt-8">Outgoing Requests</p>
              )
            }
            <div className="flex flex-col gap-6">
              {sentFriendRequests.map((friendship, key) => (
                <Link href={`/profile/${friendship.friendshipId}`} key={key} className="flex flex-row gap-3">
                  <div className={cn("h-14 w-14 rounded-full", friendship.friend.image || "bg-zinc-600")}>
                    {friendship.friend.image && <Image src={friendship.friend.image} alt={`${friendship.friend.name} profile picture`} width={64} height={64} />}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white font-medium">{friendship.friend.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
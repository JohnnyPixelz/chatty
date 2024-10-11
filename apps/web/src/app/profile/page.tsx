import { auth } from "@/auth";
import { fetchFriendships } from "@/lib/friends";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TimeDisplay } from "./page.client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user?.email) {
        redirect("/");
    }

    const friendships = await fetchFriendships();

    return (
        <div className="h-screen flex flex-col">

            <div className="flex justify-between p-6 items-center">
                <p className="text-2xl font-bold">Welcome</p>
                <Settings />
            </div>

            <div id="friend-bubbles" className="flex flex-row p-6 gap-4">

                <Link href={"/profile/friends"} className="flex flex-col gap-1 items-center justify-center">
                    <div className="rounded-full h-14 w-14 border border-dashed flex items-center justify-center">
                        <Plus className="text-zinc-500" />
                    </div>
                    <p className="text-zinc-900 text-xs">Add a friend</p>
                </Link>

                {friendships.map((friendship, key) => (
                    <div className="flex flex-col gap-1 items-center justify-center" key={key}>
                        <div className="rounded-full h-14 w-14 bg-black">

                        </div>
                        <p className="text-zinc-900 text-xs">{friendship.friend.name}</p>
                    </div>
                ))}
            </div>

            <p className="text-xl font-bold ml-6 mb-4 mt-2">Chats</p>
            <div className="bg-black rounded-t-3xl w-full p-6 h-full">
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
                            {friendship.messages.length > 0 && (
                                <TimeDisplay date={friendship.messages.reduce((latest, current) => latest.sentAt > current.sentAt ? latest : current).sentAt} className="text-zinc-400 font-semibold text-sm flex-1 mt-3 text-end" />
                            )}
                        </Link>
                    ))}
                </div>
            </div>

        </div >
    );
}

// function AddFriendDialog() {
//     return (
//         <DialogContent>
//             <DialogHeader>
//                 <DialogTitle>Add a friend</DialogTitle>
//                 <DialogDescription>
//                     Type out your friend's email
//                 </DialogDescription>
//                 <DialogFooter className="sm:justify-start">
//                     <DialogClose asChild>
//                         <Button type="button" variant="secondary">
//                             Close
//                         </Button>
//                     </DialogClose>
//                 </DialogFooter>
//             </DialogHeader>
//         </DialogContent>
//     )
// }

import { auth } from "@/auth";
import JoinNowButton from "./join-now-button";


export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-screen">

      <div className="flex flex-col pt-[100px] gap-3 items-center">
        <p className="text-5xl font-semibold">chatty</p>
        <p className="text-lg">private chat reimagined</p>

        <JoinNowButton session={session} />
      </div>

    </div>
  );
}

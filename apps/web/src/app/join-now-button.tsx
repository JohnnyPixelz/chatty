"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function JoinNowButton({ session }: { session: Session | null }) {
  const router = useRouter();

  return (
    <Button
      className="mt-12"
      onClick={() => {
        if (session) {
          router.push("/profile");
        } else {
          router.push("/login");
        }
      }}
    >
      Join Now
    </Button>
  )
}
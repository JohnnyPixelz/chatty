"use client";

import { useAuth } from "@/pocketbase-utils";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isLoading, user } = useAuth();
  const router = useRouter();

  if (!isLoading && !user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}
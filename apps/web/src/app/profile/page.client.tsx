"use client";

import { cn } from "@/lib/utils";

export function TimeDisplay({ date, className }: { date: Date, className?: string }) {
  // Ensure the date is valid
  const formattedTime = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return <p suppressHydrationWarning className={cn(className)}>{formattedTime}</p>;
};
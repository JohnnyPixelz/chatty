import { signIn } from "@/auth"
import { cn } from "@/lib/utils";

export default function SignIn({ className, redirectUrl }: { className?: string, redirectUrl?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: redirectUrl });
      }}
    >
      <button className={cn(className)} type="submit">Signin with Google</button>
    </form>
  )
} 
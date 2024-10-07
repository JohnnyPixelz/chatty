import { Chatty } from "@/components/chat/chatty";

export default function Page({ params }: { params: { chatId: string } }) {
  return (
    <Chatty chatId={params.chatId} />
  )
}
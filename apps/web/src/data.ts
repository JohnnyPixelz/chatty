export type IFriend = {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  messages: IMessage[] // Added messages field to IFriend
}

export type IMessage = {
  id: number
  senderId: number
  text: string
  timestamp: string
}

export const friends: IFriend[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Doing well! Did you finish the project?",
    lastMessageTime: "10:32 AM",
    messages: [
      { id: 1, senderId: 1, text: "Hey, how are you?", timestamp: "10:30 AM" },
      { id: 2, senderId: 0, text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
      { id: 3, senderId: 1, text: "Doing well! Did you finish the project?", timestamp: "10:32 AM" },
      { id: 4, senderId: 0, text: "Yes, I just submitted it. How about yours?", timestamp: "10:33 AM" },
      { id: 5, senderId: 1, text: "Great! Mine is almost done too.", timestamp: "10:34 AM" },
      { id: 6, senderId: 0, text: "Awesome, let me know when you're finished!", timestamp: "10:35 AM" },
      { id: 1, senderId: 1, text: "Hey, how are you?", timestamp: "10:30 AM" },
      { id: 2, senderId: 0, text: "I'm good, thanks! How about you?", timestamp: "10:31 AM" },
      { id: 3, senderId: 1, text: "Doing well! Did you finish the project?", timestamp: "10:32 AM" },
      { id: 4, senderId: 0, text: "Yes, I just submitted it. How about yours?", timestamp: "10:33 AM" },
      { id: 5, senderId: 1, text: "Great! Mine is almost done too.", timestamp: "10:34 AM" },
      { id: 6, senderId: 0, text: "Awesome, let me know when you're finished!", timestamp: "10:35 AM" }

    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Can we meet tomorrow?",
    lastMessageTime: "Yesterday",
    messages: [
      { id: 7, senderId: 2, text: "Hey, are you free this week?", timestamp: "9:00 AM, Yesterday" },
      { id: 8, senderId: 0, text: "I should be, what’s up?", timestamp: "9:15 AM, Yesterday" },
      { id: 9, senderId: 2, text: "Just wanted to catch up. Can we meet tomorrow?", timestamp: "9:30 AM, Yesterday" },
      { id: 10, senderId: 0, text: "Yeah, that works for me. Where should we meet?", timestamp: "9:35 AM, Yesterday" },
      { id: 11, senderId: 2, text: "How about the usual coffee spot?", timestamp: "9:40 AM, Yesterday" },
      { id: 12, senderId: 0, text: "Sounds good! See you there.", timestamp: "9:45 AM, Yesterday" }
    ]
  },
  {
    id: 3,
    name: "Carol Williams",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Thanks for your help!",
    lastMessageTime: "2 days ago",
    messages: [
      { id: 13, senderId: 3, text: "Hey, could you help me with that document?", timestamp: "2:00 PM, 2 days ago" },
      { id: 14, senderId: 0, text: "Sure! What do you need help with?", timestamp: "2:10 PM, 2 days ago" },
      { id: 15, senderId: 3, text: "I’m stuck on the formatting. Could you check it?", timestamp: "2:20 PM, 2 days ago" },
      { id: 16, senderId: 0, text: "Just sent you the updated version. Check your email.", timestamp: "2:30 PM, 2 days ago" },
      { id: 17, senderId: 3, text: "Got it, thanks for your help!", timestamp: "2:35 PM, 2 days ago" },
      { id: 18, senderId: 0, text: "No problem, happy to help!", timestamp: "2:40 PM, 2 days ago" }
    ]
  }
]


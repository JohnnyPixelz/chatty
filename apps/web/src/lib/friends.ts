import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function fetchFriendships() {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      friendships1: {
        where: {
          isApproved: true,
        },
        include: {
          messages: true,
          user1: true,
          user2: true,
        }
      },
      friendships2: {
        where: {
          isApproved: true,
        },
        include: {
          messages: true,
          user1: true,
          user2: true,
        }
      },
    }
  });

  if (!user) {
    return [];
  }

  const friends = [...user.friendships1, ...user.friendships2]
    .filter(friendship => friendship.isApproved)
    .map(friendship => ({
      friendshipId: friendship.id,
      friend: friendship.user1.id == session.user?.id ? friendship.user2 : friendship.user1,
      messages: friendship.messages,
    }));

  return friends;
}

export async function fetchFriendship(friendshipId: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  const friendship = await prisma.friendship.findUnique({
    where: {
      id: friendshipId,
      isApproved: true,
      OR: [
        { user1Id: session.user.id },
        { user2Id: session.user.id }
      ]
    },
    include: {
      user1: true,
      user2: true,
      messages: {
        include: {
          sender: true
        }
      }
    }
  });

  if (!friendship) return null;

  return {
    friendshipId: friendship.id,
    friend: friendship.user1.id == session.user?.id ? friendship.user2 : friendship.user1,
    messages: friendship.messages,
  }
}

export async function getPendingSentFriendRequests() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const friendships = await prisma.friendship.findMany({
    where: {
      isApproved: false,
      OR: [
        { user1Id: session.user.id },
        { user2Id: session.user.id }
      ]
    },
    include: {
      user1: true,
      user2: true,
    }
  });

  const pendingSentFriendRequests = friendships
    .filter((friendship) =>
      (friendship.requestInitiator === "U1" && friendship.user1Id === session.user?.id) ||
      (friendship.requestInitiator === "U2" && friendship.user2Id === session.user?.id)
    )
    .map((friendship) => ({
      friendshipId: friendship.id,
      friend: friendship.user1.id == session.user?.id ? friendship.user2 : friendship.user1,
    }))

  return pendingSentFriendRequests;
}

export async function getPendingReceivedFriendRequests() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const friendships = await prisma.friendship.findMany({
    where: {
      isApproved: false,
      OR: [
        { user1Id: session.user.id },
        { user2Id: session.user.id }
      ]
    },
    include: {
      user1: true,
      user2: true,
    }
  });

  const pendingReceivedFriendRequests = friendships
    .filter((friendship) =>
      (friendship.requestInitiator === "U2" && friendship.user1Id === session.user?.id) ||
      (friendship.requestInitiator === "U1" && friendship.user2Id === session.user?.id)
    )
    .map((friendship) => ({
      friendshipId: friendship.id,
      friend: friendship.user1.id == session.user?.id ? friendship.user2 : friendship.user1,
    }))

  return pendingReceivedFriendRequests;
}

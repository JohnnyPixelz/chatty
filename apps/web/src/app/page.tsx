"use client";

import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

export default function Page() {
  const [pb, setPb] = useState<PocketBase | null>(null);

  useEffect(() => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    console.log(pb.authStore);
    setPb(pb);
  }, []);

  return (
    <div>
      <button
        onClick={async () => {
          if (pb == null) return;

          const authData = await pb.collection('users').authWithPassword(
            'johnny',
            'malakas123',
          );

          console.log(authData);

          console.log(pb.authStore.isValid);
          console.log(pb.authStore);
        }}
      >
        Auth
      </button>
    </div>
  );
}

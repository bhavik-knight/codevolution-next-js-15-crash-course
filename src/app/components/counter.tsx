"use client";

import { useState } from "react";
import { /*useAuth, */ useUser } from "@clerk/nextjs";

export const Counter = () => {
  //   const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  console.log("Counter Component");
  const [count, setCount] = useState(0);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <button onClick={() => setCount(count + 1)}>clicked {count} times</button>
  );
};

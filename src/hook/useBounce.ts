import { useEffect, useState } from "react";

export function useBounce<T>(value:T,delay=500) {
  const [isBouncing, setIsBouncing] = useState(value);

  useEffect(() => {
    const timer=setTimeout(() => {
      setIsBouncing(value);
    }, delay);

    return ()=>clearTimeout(timer)
  }, [value,delay]);

  return isBouncing;
}
import { useEffect, useState } from 'react';

export function useToast(duration = 3000) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return undefined;

    const timer = window.setTimeout(() => setMessage(null), duration);
    return () => window.clearTimeout(timer);
  }, [duration, message]);

  return { message, showToast: setMessage };
}

import { useEffect, useRef, useState } from 'react';

export default function EventsLoading({
  delay = 2000,
}: {
  delay: number | null;
}) {
  const [index, setIndex] = useState(0);

  const intervalRef = useRef<number | undefined>(undefined);

  const messages = [
    'Loading',
    'Server may take up to 1 min to start up',
    'Please wait',
  ];
  const { length } = messages;

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(
        () => setIndex(prev => (prev + (1 % length) + length) % length),
        delay
      );

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay, length]);

  return <p className="text-sm p-2">{messages[index]}</p>;
}

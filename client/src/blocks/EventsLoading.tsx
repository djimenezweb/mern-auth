import { useEffect, useRef, useState } from 'react';

export default function EventsLoading() {
  const messages = [
    'Loading',
    'Server may take up to 1 min to start up',
    'Please wait',
  ];

  const blocks = [
    ' ',
    '▁',
    '▂',
    '▃',
    '▄',
    '▅',
    '▆',
    '▇',
    '▆',
    '▅',
    '▄',
    '▃',
    '▂',
    '▁',
  ];

  return (
    <p className="text-sm p-2 whitespace-pre">
      <AnimatedText arr={blocks} delay={200} />{' '}
      <AnimatedText arr={messages} delay={3000} />
    </p>
  );
}

function AnimatedText({ arr, delay }: { arr: string[]; delay: number }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);
  const { length } = arr;

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(
        () => setIndex(prev => (prev + (1 % length) + length) % length),
        delay
      );
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay, length]);

  return arr[index];
}

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import useEvent from '@/hooks/useEvent';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';

export default function Events() {
  const { events } = useEvent();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView(false);
  }, [events]);

  return (
    <Card className="dark bg-black">
      <ScrollArea className="w-full h-full">
        <CardContent ref={ref} className="pt-4 font-mono font-light">
          <Table>
            <TableBody>
              {events &&
                events.length > 0 &&
                events.map((e, i) => (
                  <TableRow key={`${e.message}-${i}`}>
                    <TableCell className="w-[8ch] align-top pl-0 opacity-65">
                      {e.time}
                    </TableCell>
                    <TableCell className="align-top pr-0">
                      {e.message}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import useEvent from '@/hooks/useEvent';

export default function Events() {
  const { events } = useEvent();
  return (
    <Card className="dark bg-black">
      <CardContent className="pt-4 font-mono">
        <Table>
          <TableBody>
            {events &&
              events.length > 0 &&
              events.map((e, i) => (
                <TableRow key={`${e.message}-${i}`}>
                  <TableCell className="align-top pl-0">{e.time}</TableCell>
                  <TableCell className="align-top pr-0">{e.message}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

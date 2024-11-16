import {
  Table,
  TableBody,
  TableCell,
  // TableCaption,
  // TableFooter,
  // TableHead,
  // TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  // CardDescription,
  // CardFooter,
  CardTitle,
} from '@/components/ui/card';
import useEvent from '@/hooks/useEvents';

export default function Events() {
  const { events } = useEvent();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {events &&
              events.length > 0 &&
              events.map((e, i) => (
                <TableRow key={`${e.message}-${i}`}>
                  <TableCell>{e.time}</TableCell>
                  <TableCell>{e.message}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

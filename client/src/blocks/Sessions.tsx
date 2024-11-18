import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { Session } from '@/types';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/env';
import { fetchDeleteOptions, fetchGetOptions } from '@/config/fetchOptions';
import useEvent from '@/hooks/useEvents';

export default function Sessions() {
  const { user } = useAuth();
  const { addEvent } = useEvent();
  const [sessions, setSessions] = useState<Session[]>([]);

  async function getSessions() {
    if (!user) return;
    const response = await fetch(
      `${API_URL}/api/session/${user.userId}`,
      fetchGetOptions
    );
    if (!response.ok) return;
    const { data, message }: { data: Session[]; message: string } =
      await response.json();
    setSessions(data);
    addEvent(message);
  }

  async function closeSession(sessionId: string) {
    if (!user) return;
    const response = await fetch(
      `${API_URL}/api/session/${sessionId}`,
      fetchDeleteOptions
    );
    if (!response.ok) return;
    const { data, message }: { data: Session[]; message: string } =
      await response.json();
    setSessions(data);
    addEvent(message);
  }

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Close</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions &&
              sessions.length > 0 &&
              sessions.map(s => (
                <TableRow key={s._id}>
                  <TableCell className="capitalize">
                    {s.userAgentDevice || 'unknown'}
                  </TableCell>
                  <TableCell className="capitalize">
                    {s.userAgentOS || 'unknown'}
                  </TableCell>
                  <TableCell className="capitalize">
                    {s.userAgentName || 'unknown'}
                  </TableCell>
                  <TableCell>{s.ip}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => closeSession(s._id)}>
                      close
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

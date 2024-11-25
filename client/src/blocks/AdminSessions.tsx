import { API_URL } from '@/env';
import useFetch from '@/hooks/useFetch';
import { ApiResponse, Session } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchDeleteOptions, fetchPutOptions } from '@/config/fetchOptions';
import useEvent from '@/hooks/useEvent';
import { CheckedState } from '@radix-ui/react-checkbox';
import useAuth from '@/hooks/useAuth';

export default function AdminSessions({
  selectedUserId,
}: {
  selectedUserId: string;
}) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSessions,
  } = useFetch<ApiResponse<Session[]>>(
    `${API_URL}/api/session/${selectedUserId}`
  );
  const { addEvent } = useEvent();
  const { setUser } = useAuth();

  // Close session function: deletes session and fetch sessions again
  async function closeSession(sessionId: string) {
    try {
      const response = await fetch(
        `${API_URL}/api/session/${sessionId}`,
        fetchDeleteOptions
      );
      const json = (await response.json()) as ApiResponse;
      if (json.message) {
        addEvent(json.message, json.time);
      }
      if (json.logout) {
        setUser(null);
      }
      refetchSessions();
    } catch (err) {
      if (err instanceof Error) {
        addEvent(err.message);
      }
    }
  }

  // Update session validity
  async function handleSession(checked: CheckedState, sessionId: string) {
    try {
      const response = await fetch(`${API_URL}/api/session/${sessionId}`, {
        ...fetchPutOptions,
        body: JSON.stringify({ valid: checked }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.message) {
        addEvent(data.message, data.time);
      }
      refetchSessions();
    } catch (err) {
      if (err instanceof Error) {
        addEvent('Error: ' + err.message);
      }
    }
  }

  return (
    <>
      {isLoading && <p>Loading</p>}

      {isError && <p>Error: {error}</p>}

      {data && data.sessions && data.sessions.length === 0 && (
        <p>No active sessions found</p>
      )}

      {data && data.sessions && data.sessions.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Valid</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Close</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.sessions.map(s => (
              <TableRow key={s._id}>
                <TableCell className="capitalize">
                  {s.userAgentDevice || 'unknown'}
                </TableCell>
                <TableCell>{s.userAgentOS || 'unknown'}</TableCell>
                <TableCell className="capitalize">
                  {s.userAgentName || 'unknown'}
                </TableCell>
                <TableCell>{s.ip}</TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked={s.valid}
                    className="mx-auto"
                    onCheckedChange={checked => handleSession(checked, s._id)}
                  />
                </TableCell>
                <TableCell>
                  {new Date(s.expires).toLocaleString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    hourCycle: 'h24',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      closeSession(s._id);
                    }}>
                    close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

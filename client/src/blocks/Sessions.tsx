import { useEffect } from 'react';
import { API_URL } from '@/env';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import { ApiResponse, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { fetchDeleteOptions } from '@/config/fetchOptions';
import useEvent from '@/hooks/useEvent';
import { RefreshCcw } from 'lucide-react';
import {
  userAgentDeviceIcons,
  userAgentNameIcons,
  userAgentOSIcons,
} from '@/lib/userAgentIcons';

export default function Sessions() {
  const { user } = useAuth();
  const { addEvent } = useEvent();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSessions,
  } = useFetch<ApiResponse<Session[]>>(
    `${API_URL}/api/session/${user?.userId}`
  );

  // This useEffect solves the following warning:
  // Cannot update a component (`EventProvider`) while rendering a different component (`Sessions`).
  useEffect(() => {
    let ignore = false;
    if (isLoading) return;
    if (!ignore && data?.message) {
      addEvent(data?.message ?? error, data?.time);
    }
    return () => {
      ignore = true;
    };
  }, [data?.message, data?.time]);

  // Close session function: deletes session and fetch sessions again
  async function closeSession(sessionId: string) {
    if (!user) return;
    try {
      const response = await fetch(
        `${API_URL}/api/session/${sessionId}`,
        fetchDeleteOptions
      );
      const json = (await response.json()) as ApiResponse;
      if (json.message) {
        addEvent(json.message, json.time);
      }
      refetchSessions();
    } catch (err) {
      if (err instanceof Error) {
        addEvent('Error: ' + err.message);
      }
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Sessions</CardTitle>
        <Button variant="ghost" size="icon" onClick={refetchSessions}>
          <RefreshCcw />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading</p>}

        {isError && <p>Error: {error}</p>}

        {data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Close</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {data.sessions &&
                  data.sessions.length > 0 &&
                  data.sessions.map(s => (
                    <TableRow key={s._id}>
                      <TableCell>
                        <div className="h-full flex gap-3 items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {userAgentDeviceIcons[s.userAgentDevice] ||
                                userAgentDeviceIcons.default}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{s.userAgentDevice}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {userAgentOSIcons[s.userAgentOS] ||
                                userAgentOSIcons.default}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{s.userAgentOS}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {userAgentNameIcons[s.userAgentName] ||
                                userAgentNameIcons.default}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{s.userAgentName}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>{s.ip}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => closeSession(s._id)}>
                          close
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TooltipProvider>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

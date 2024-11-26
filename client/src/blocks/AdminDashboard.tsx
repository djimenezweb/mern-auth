import { API_URL } from '@/env';
import useFetch from '@/hooks/useFetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ApiResponse, Role, User } from '@/types';
import { useState } from 'react';
import AdminSessions from './AdminSessions';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';
import { fetchDeleteOptions, fetchPutOptions } from '@/config/fetchOptions';
import useEvent from '@/hooks/useEvent';
import { CheckedState } from '@radix-ui/react-checkbox';
import { RefreshCcw } from 'lucide-react';

export default function AdminDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchUsers,
  } = useFetch<ApiResponse<User[]>>(`${API_URL}/api/users/`);
  const { addEvent } = useEvent();

  const INITIAL_USER = {
    userId: '',
    username: '',
  };

  const [selectedUser, setSelectedUser] = useState(INITIAL_USER);

  // Update roles function
  async function handleRoles(
    checked: CheckedState,
    role: Role,
    roles: Role[],
    userId: string
  ) {
    let nextRoles: Role[];
    if (checked) {
      nextRoles = [...roles, role];
    } else {
      nextRoles = roles.filter(r => r !== role);
    }
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        ...fetchPutOptions,
        body: JSON.stringify({ roles: nextRoles }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.message) {
        addEvent(data.message, data.time);
      }
      refetchUsers();
    } catch (err) {
      if (err instanceof Error) {
        addEvent('Error: ' + err.message);
      }
    }
  }

  // Delete user function
  async function deleteUser(id: string) {
    try {
      const response = await fetch(
        `${API_URL}/api/users/${id}`,
        fetchDeleteOptions
      );
      const data = (await response.json()) as ApiResponse;
      if (data.message) {
        addEvent(data.message, data.time);
      }
      refetchUsers();
    } catch (err) {
      if (err instanceof Error) {
        addEvent('Error: ' + err.message);
      }
    } finally {
      setSelectedUser(INITIAL_USER);
    }
  }

  return (
    <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2">
      <Card onClick={() => setSelectedUser(INITIAL_USER)}>
        <CardHeader className="space-y-0 flex flex-row justify-between items-center">
          <CardTitle>Users</CardTitle>
          <Button variant="ghost" size="icon" onClick={refetchUsers}>
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
                  <TableHead>Username</TableHead>
                  <TableHead className="text-center">user</TableHead>
                  <TableHead className="text-center">admin</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.users &&
                  data.users.length > 0 &&
                  data.users.map(u => (
                    <TableRow
                      key={u.userId}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedUser({
                          username: u.username,
                          userId: u.userId,
                        });
                      }}
                      data-state={
                        u.userId === selectedUser.userId ? 'selected' : ''
                      }>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>
                        <Checkbox
                          className="mx-auto"
                          disabled
                          defaultChecked={u.roles.includes('user')}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onCheckedChange={checked =>
                            handleRoles(checked, 'admin', u.roles, u.userId)
                          }
                          className="mx-auto"
                          defaultChecked={u.roles.includes('admin')}
                        />
                      </TableCell>
                      <TableCell>
                        <ConfirmDialog
                          title={`Delete user ${u.username}?`}
                          description="This action is irreversible"
                          action={() => deleteUser(u.userId)}>
                          <Button
                            className="block mx-auto"
                            variant="destructive"
                            size="sm">
                            delete
                          </Button>
                        </ConfirmDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedUser.userId === ''
              ? 'Sessions'
              : `${selectedUser.username}'s sessions`}
          </CardTitle>
          {selectedUser.userId === '' && (
            <CardDescription>Select a user</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {selectedUser.userId ? (
            <AdminSessions selectedUserId={selectedUser.userId} />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

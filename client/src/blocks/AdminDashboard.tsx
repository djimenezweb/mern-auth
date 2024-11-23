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
import { ApiResponse, User } from '@/types';
import { useState } from 'react';
import AdminSessions from './AdminSessions';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';

export default function AdminDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchUsers,
  } = useFetch<ApiResponse<User[]>>(`${API_URL}/api/users/`);

  const [selectedUser, setSelectedUser] = useState({
    userId: '',
    username: '',
  });

  function deleteUser() {
    console.log('Delete user clicked');
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading</p>}

          {isError && <p>Error: {error}</p>}

          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>user</TableHead>
                  <TableHead>admin</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.users &&
                  data.users.length > 0 &&
                  data.users.map(u => (
                    <TableRow
                      key={u.userId}
                      onClick={() =>
                        setSelectedUser({
                          username: u.username,
                          userId: u.userId,
                        })
                      }
                      data-state={
                        u.userId === selectedUser.userId ? 'selected' : ''
                      }>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>
                        <Checkbox
                          disabled
                          defaultChecked={u.roles.includes('user')}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox defaultChecked={u.roles.includes('admin')} />
                      </TableCell>
                      <TableCell>
                        <ConfirmDialog
                          title={`Delete user ${u.username}?`}
                          description="This action is irreversible"
                          action={deleteUser}>
                          <Button variant="destructive" size="sm">
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

'use client';

import { useUsers, useCreateUser } from '@/apis';

export default function UsersPage() {
  const { data: users, isLoading, error } = useUsers();
  const { mutate: createUser, isPending } = useCreateUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
} 
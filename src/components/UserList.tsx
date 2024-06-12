import React, { useEffect, useState } from 'react';
import { listUsers, User } from '../services/dbService';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await listUsers();
        setUsers(users);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    getUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='user-list'>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className='user-item'>
            <img src={user.imageUrl} alt={`${user.userName}'s avatar`} />
            <div>
              <p>Name: {user.userName}</p>
              <p>Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

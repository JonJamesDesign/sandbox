import { useEffect, useState, FC } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
};

const DataFetcher: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(function onMount() {
    async function fetchUser() {
      setLoading(true);
      try {
        const request = await fetch(
          'https://jsonplaceholder.typicode.com/users/1'
        );
        const user: User = await request.json();
        setUser(user);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return !user && !loading ? null : (
    <>
      {loading && <p>Loading&hellip;</p>}

      {!loading && error && <p>Error fetching user</p>}

      {user && (
        <>
          <p>User Info:</p>
          <ul>
            <li>ID: {user.id}</li>
            <li>Name: {user.name}</li>
            <li>Username: {user.username}</li>
          </ul>
        </>
      )}
    </>
  );
};

export default DataFetcher;

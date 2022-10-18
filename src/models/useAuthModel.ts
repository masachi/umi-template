import { useState, useCallback } from 'react';

export default function useAuthModel() {
  // TODO model hooks

  const [user, setUser] = useState(null);

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);

  return {
    user,
    signin,
    signout,
  };
}

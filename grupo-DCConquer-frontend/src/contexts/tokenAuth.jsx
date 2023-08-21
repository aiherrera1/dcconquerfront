import React, { createContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const tokenAuth = createContext();

function TokenAuthProvider({ children }) {
  const [currentMatches, storeMatches, clearStoredMatches] = useLocalStorage('matches');

  const handleTokenChange = (token, action) => {
    if (action === 'logout') {
      clearStoredMatches();
    } else {
      storeMatches(token);
    }
  };

  const matchStatus = useMemo(
    () => ({ currentMatches, handleTokenChange }),
    [currentMatches, handleTokenChange],
  );

  return (
    <tokenAuth.Provider value={matchStatus}>{children}</tokenAuth.Provider>
  );
}

export default TokenAuthProvider;

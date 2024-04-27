import { createContext, useState } from 'react';

export const QueryContext = createContext('anime');

export function QueryContextProvider({ children }) {
  const [query, setQuery] = useState('anime');

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}

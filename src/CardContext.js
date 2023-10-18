import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export function useCardContext  () {
  return useContext(CardContext);
};

export function CardProvider  ({ children }) {
  const [activeCardCount, setActiveCardCount] = useState(0);

  return (
    <CardContext.Provider value={{ activeCardCount, setActiveCardCount }}>
      {children}
    </CardContext.Provider>
  );
};

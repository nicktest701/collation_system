import React, { useReducer } from 'react';
import { RootReducer } from '../reducers/RootReducer';

export const RootContext = React.createContext();
const RootProvider = ({ children }) => {
  const initialState = {
    alert: {
      open: false,
      message: '',
      severity: 'info',
    },
  };

  const [rootState, rootDispatch] = useReducer(RootReducer, initialState);

  return (
    <RootContext.Provider
      value={{
        rootState,
        rootDispatch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;

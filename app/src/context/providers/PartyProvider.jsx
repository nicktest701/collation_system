import React, { useReducer } from 'react';
import { PartyReducer } from '../reducers/PartyReducer';

export const PartyContext = React.createContext();
const PartyProvider = ({ children }) => {
  const initialState = {
    editData: {
      open: false,
      data: {},
    },
  };

  const [partyState, partyDispatch] = useReducer(PartyReducer, initialState);

  return (
    <PartyContext.Provider
      value={{
        partyState,
        partyDispatch,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export default PartyProvider;

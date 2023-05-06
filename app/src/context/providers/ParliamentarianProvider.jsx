import React, { useReducer } from 'react';
import { ParliamentarianReducer } from '../reducers/ParliamentarianReducer';

export const ParliamentarianContext = React.createContext();
const ParliamentarianProvider = ({ children }) => {
  const initialState = {
    viewData: {
      open: false,
      data: {},
    },
    editData: {
      open: false,
      data: {},
    },
  };

  const [parliamentarianState, parliamentarianDispatch] = useReducer(
    ParliamentarianReducer,
    initialState
  );

  return (
    <ParliamentarianContext.Provider
      value={{
        parliamentarianState,
        parliamentarianDispatch,
      }}
    >
      {children}
    </ParliamentarianContext.Provider>
  );
};

export default ParliamentarianProvider;

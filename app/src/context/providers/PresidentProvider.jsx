import React, { useReducer } from 'react';
import { PresidentReducer } from '../reducers/PresidentReducer';

export const PresidentContext = React.createContext();
const PresidentProvider = ({ children }) => {
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

  const [presidentState, presidentDispatch] = useReducer(
    PresidentReducer,
    initialState
  );

  return (
    <PresidentContext.Provider
      value={{
        presidentState,
        presidentDispatch,
      }}
    >
      {children}
    </PresidentContext.Provider>
  );
};

export default PresidentProvider;

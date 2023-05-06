import React, { useReducer } from 'react';
import { ConstituencyReducer } from '../reducers/ConstituencyReducer';

export const ConstituencyContext = React.createContext();
const ConstituencyProvider = ({ children }) => {
  const initialState = {
    openFileDialog: false,
    constituencyFromFile: [],
  };

  const [constituencyState, constituencyDispatch] = useReducer(
    ConstituencyReducer,
    initialState
  );

  return (
    <ConstituencyContext.Provider
      value={{
        constituencyState,
        constituencyDispatch,
      }}
    >
      {children}
    </ConstituencyContext.Provider>
  );
};

export default ConstituencyProvider;

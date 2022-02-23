import React, { createContext, useReducer, useContext } from 'react';

import { SET_CURRENT_USER } from './actions';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const initialState = { user: null };

const globalReducer = (state, action) => {
  const { user } = action.payload;

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user
      };

    default:
      return {
        ...state
      };
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);

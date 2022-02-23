import React, { createContext, useReducer, useContext } from 'react';

import { SET_CURRENT_USER } from './actions';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (state, action) => {
  const { user } = action.payload;

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user
      };

    default:
      return {
        ...state,
        user: null
      };
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);

'use client'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../lib/firebase";
import { fetchGetParamRequest } from "../lib/utils";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);
  if (!dispatch) {
    throw new Error("useAuthDispatch must be used within an AuthContextProvider");
  }
  return dispatch;
};


const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { 
        ...state, 
        user: { 
          ...state.user, 
          ...action.payload, 
          userProfile: {
            ...state.user.userProfile,
            ...action.payload.userProfile,
          }
        }};
    default:
      return state;
  }
};

// Define the initial state
const initialState = { user: null };

export const getUserData = async (uid, dispatchUser) => {
  try {
    const { success, data } = await fetchGetParamRequest('/api/user/uid/', uid);
    if (success) {
      dispatchUser({type: "SET_USER", payload: data.user});
    } else {
      dispatchUser({type:"CLEAR_USER"});
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    dispatchUser({type:"CLEAR_USER"});
  }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await getUserData(user.uid, dispatch);
                setLoading(false);
            } else {
                dispatch({ type: "CLEAR_USER" });
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {loading ? 'loading...'  : children}
        </AuthContext.Provider>
    );
}
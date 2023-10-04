'use client'
import { useAuth } from "@/app/(auth)/useAuth";
import { fetchGetParamRequest } from "@/app/lib/utils";
// context/ChatConnectionContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "@/app/(auth)/useAuth";

// Define the initial state for chat connections
const initialState = {
  connections: [],
  loading: false,
  error: null,
};

// Create the ChatConnection context
const ChatConnectionContext = createContext(initialState);

// Define the actions for the context
const ACTIONS = {
  SET_CONNECTIONS: "SET_CONNECTIONS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Reducer function to update the context state
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ChatConnectionProvider component to wrap your Next.js app with the context
export function ChatConnectionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);

  const fetchConnections = async () => {
    const {success, data} = await fetchGetParamRequest('/api/connection/', user.uid);
    if(success) {
        const { connectionWithUsers }  = data;
        dispatch({ type: ACTIONS.SET_CONNECTIONS, payload: connectionWithUsers });
    }
  }

  // Fetch and set chat connections on component mount
  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    // Make API calls or fetch data here to get chat connections
    // Replace this with your actual API call
    

    // Simulated data for demonstration purposes
    fetchConnections();

    
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  }, []);

  return (
    <ChatConnectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatConnectionContext.Provider>
  );
}

// Custom hook to access the ChatConnection context
export function useChatConnection() {
  return useContext(ChatConnectionContext);
}

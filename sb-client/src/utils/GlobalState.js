import React, { createContext, useReducer, useContext } from "react";


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      // console.log("setting user GS:  ", action.type, "state", state)
      return {
        ...state,
        currentUser: action.user,
        // loading: false
      };
    case "setClasses":
      return {
        ...state,
        classes: action.classes,
        // loading: false
      };
    case "setAllSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        sessions: action.sessions,
        // loading: false
      };
    case "setParticipatingSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        participatingSessions: action.sessions,
        // loading: true
      };
    case "setHostedSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        hostedSessions: action.sessions,
        // loading: false
      };
      case "setLocations":
        return{
          ...state,
          locations: action.locations,
          // loading: false
        }

    case "LOADING":
      console.log("setting object to true")
      return {
        ...state,
        loading: action.loading
      };
      case "LOADING-Participants":
        console.log("setting object to true")
        return {
          ...state,
          loading: action.loading
        };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: {
      id: "",
      firstName: "",
      lastName: "",
      image: ""
    },
    session: {},
    classes: [],
    sessions: [],
    hostedSessions: [],
    participatingSessions: [],
    locations:[],
    loading:false,
    loadingParticipants:false
    


  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

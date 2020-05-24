import React, { createContext, useReducer, useContext } from "react";
// import {
//   // SET_CURRENT_POST,
//   // REMOVE_POST,
//   // UPDATE_POSTS,
//   // ADD_POST,
//   // ADD_FAVORITE,
//   // UPDATE_FAVORITES,
//   // REMOVE_FAVORITE,
//   // LOADING
// } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case "setUser":
    console.log("setting user" , state)
    return {
      ...state,
      currentUser: action.user,
      loading: false
    };

  // case UPDATE_POSTS:
  //   return {
  //     ...state,
  //     posts: [...action.posts],
  //     loading: false
  //   };

  // case ADD_POST:
  //   return {
  //     ...state,
  //     posts: [action.post, ...state.posts],
  //     loading: false
  //   };

  // case REMOVE_POST:
  //   return {
  //     ...state,
  //     posts: state.posts.filter((post) => {
  //       return post._id !== action._id; 
  //     })
  //   };

  // case ADD_FAVORITE:
  //   return {
  //     ...state,
  //     favorites: [action.post, ...state.favorites],
  //     loading: false
  //   };

  // case UPDATE_FAVORITES:
  //   return {
  //     ...state,
  //     favorites: [...state.favorites],
  //     loading: false
  //   };

  // case REMOVE_FAVORITE:
  //   return {
  //     ...state,
  //     favorites: state.favorites.filter((post) => {
  //       return post._id !== action._id; 
  //     })
  //   };

  // case LOADING:
  //   return {
  //     ...state,
  //     loading: true
  //   };

  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser:{
      id: "",
      firstName: "",
      lastName:"",
      image:""
    },
    session:{
      date: Date(),
      location: "",
      host:"",
      participants:[]
    },
    classes:[],
    sessions:[]

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

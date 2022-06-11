import React, { createContext, useState, useEffect, useContext, useReducer } from "react";

// create context
const DogContext = createContext();

const initialState = {
  favorite: '',
  error: null
};

export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAIL = "SAVE_FAIL";

export function saveSuccess(favorite) {
  return { type: SAVE_SUCCESS, favorite };
}

export function saveFail(error) {
  return { type: SAVE_FAIL, error };
}


export function favoriteReducer(state, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return { favorite: action.favorite, error: null };
    case SAVE_FAIL:
      return { favorite: null, error: action.error };
    default:
      return state;
  }
}

const DogContextProvider = ({ children }) => {
  const [dog, setRazas] = useState([]);
  const [dogFilter, setRazasFilter] = useState([]);
  const [load, setLoad] = useState(true);
  const [fav, dispatch] = useReducer(favoriteReducer, initialState);
  const favData = { fav, dispatch };

  const getRazas = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const json = await response.json();
      var names = Object.keys(json?.message);
      for (let index = 0; index < names.length; index++) {
        const element = names[index];
        setRazas(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
          },
        ]);
        setRazasFilter(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
          },
        ]);
      }
      setLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRazas();
  }, []);

  return (
    <DogContext.Provider value={{dog, dogFilter, load, favData}}>
      {children}
    </DogContext.Provider>
  );
};

export { DogContext, DogContextProvider };


export function useAPI() {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
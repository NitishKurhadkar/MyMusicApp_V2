import {createContext, useContext, useReducer} from 'react';

//This is Data Layer

export const StateContext = createContext();

//Build a  Provider

export const StateProvider = ({reducer,initialState, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)


//This is how we use it inside the component
export const useStateValue = () => useContext(StateContext);
import { FC, useReducer } from 'react';
import { UIContext,uiReducer } from './';


export interface UIState {
    isMenuOpen:any;
}

const label_Initial_State:UIState={
    isMenuOpen:false,
}

export const UIProvider =({ children }:any):any=>{

    const [state, dispatch] = useReducer(uiReducer , label_Initial_State);

    const toggleSideMenu = () =>{
        dispatch( { type:'[UI]-Toggle-Menu' } )
       
    }

return(
 <UIContext.Provider value={{
    ...state,
    //Methods
    toggleSideMenu,
 }} >
    { children }
 </UIContext.Provider>
)
 }
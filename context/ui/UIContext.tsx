import { createContext } from 'react';


export interface ContextProps{
isMenuOpen: boolean;
toggleSideMenu:()=>void
}


export const UIContext = createContext({} as ContextProps);

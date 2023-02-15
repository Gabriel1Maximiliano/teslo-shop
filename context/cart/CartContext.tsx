import { ICartProduct } from 'interfaces';
import { createContext } from 'react';


export interface ContextProps{
cart: ICartProduct[] | ICartProduct;
}


export const CartContext = createContext({} as ContextProps);
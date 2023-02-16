import { ICartProduct } from 'interfaces';
import { createContext } from 'react';


export interface ContextProps{
cart: ICartProduct[] | ICartProduct;

//Methods
addProductCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);
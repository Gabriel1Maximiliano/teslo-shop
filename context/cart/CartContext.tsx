import { ICartProduct } from 'interfaces';
import { createContext } from 'react';


export interface ContextProps{
cart: ICartProduct[] | any;

//Methods
addProductCart: (product: ICartProduct) => void;
updateCartQuantity: (product: ICartProduct) => void; 
removeCartProduct: (product: ICartProduct) => void; 
}


export const CartContext = createContext({} as ContextProps);
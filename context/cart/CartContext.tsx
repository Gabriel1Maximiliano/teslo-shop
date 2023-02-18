import { ICartProduct } from 'interfaces';
import { createContext } from 'react';


export interface ContextProps{
isLoaded:boolean;
cart: ICartProduct[] | any;
numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

//Methods
addProductCart: (product: ICartProduct) => void;
updateCartQuantity: (product: ICartProduct) => void; 
removeCartProduct: (product: ICartProduct) => void; 
}


export const CartContext = createContext({} as ContextProps);
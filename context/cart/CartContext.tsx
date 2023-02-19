import { ICartProduct } from 'interfaces';
import { createContext } from 'react';
import { ShippingAddress } from './CartProvider';


export interface ContextProps{
isLoaded:boolean;
cart: ICartProduct[] | any;
numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;


    shippingAddress ?:ShippingAddress,

//Methods
addProductCart: (product: ICartProduct) => void;
updateCartQuantity: (product: ICartProduct) => void; 
removeCartProduct: (product: ICartProduct) => void;
updateAddress: (address: ShippingAddress) => void; 
}


export const CartContext = createContext({} as ContextProps);
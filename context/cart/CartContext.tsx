import { ICartProduct, ShippingAddress } from 'interfaces';
import { createContext } from 'react';



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
createOrder: () => Promise<{ hasError: boolean; message: any; } | undefined>;
}


export const CartContext = createContext({} as ContextProps);
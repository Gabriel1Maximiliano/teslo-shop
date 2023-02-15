import { FC, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';



export interface CartState {
    cart:ICartProduct | [];
}

const Cart_Initial_State:CartState={
    cart:[]}

export const CartProvider=({ children }:any):any =>{

    const [state, dispatch] = useReducer(cartReducer , Cart_Initial_State)

return(
 <CartContext.Provider value={{
    ...state
    }} >
    { children }
 </CartContext.Provider>
)
 }
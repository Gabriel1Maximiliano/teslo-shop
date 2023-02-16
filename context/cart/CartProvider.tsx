import { FC, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';



export interface CartState {
    cart:ICartProduct[] | [];
}

const Cart_Initial_State:CartState={
    cart:[]}

export const CartProvider=({ children }:any):any =>{

    const [state, dispatch] = useReducer(cartReducer , Cart_Initial_State)
const addProductCart = (product:ICartProduct) =>{

 const isProductInCart = state.cart.some( (p:any) =>p._id === product._id );
if( !isProductInCart ) return dispatch({ type:'[Catrt]- Update-products-in-cart', payload:[...state.cart, product] })
 const isProductCartButDifferentSize = state.cart.some( p=> p._id === product._id && p.size === product.size  );
 if( !isProductCartButDifferentSize ) return dispatch({ type:'[Catrt]- Update-products-in-cart', payload:[...state.cart, product] })

 // acumular 

  const updatedProduct = state.cart.map(p=>{
    if( p._id !== product._id ) return p;
    if( p.size !== product.size ) return p;

    p.quantity += product.quantity;
    return p;
  } )

  dispatch({ type:'[Catrt]- Update-products-in-cart',payload: updatedProduct })

}

return(
 <CartContext.Provider value={{
    ...state,


    //Methods
    addProductCart
    }} >
    { children }
 </CartContext.Provider>
)
 }
import { FC, useEffect, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';
import Cookie from 'js-cookie';


export interface CartState {
    cart:ICartProduct[] | [];
}

const Cart_Initial_State:CartState={
    cart:[]}

export const CartProvider=({ children }:any):any =>{
    const [state, dispatch] = useReducer(cartReducer , Cart_Initial_State);

    useEffect(()=>{
  try {
    const CookieProducta = Cookie.get( 'cart') ? JSON.parse( Cookie.get( 'cart' )! ):[];
    dispatch( { type:'[Cart]-LoadCart-from-cookies | localStorage',payload:CookieProducta } );
  } catch (error) {
    dispatch( { type:'[Cart]-LoadCart-from-cookies | localStorage',payload:[] } );
  }
       
    },[])

    useEffect(() => {
   Cookie.set( 'cart', JSON.stringify( state.cart ) )
    }, [state!.cart])
    

const addProductCart = (product:ICartProduct) =>{

 const isProductInCart = state.cart.some( (p:any) =>p._id === product._id );
if( !isProductInCart ) return dispatch({ type:'[Cart]- Update-products-in-cart', payload:[...state.cart, product] })
 const isProductCartButDifferentSize = state.cart.some( p=> p._id === product._id && p.size === product.size  );
 if( !isProductCartButDifferentSize ) return dispatch({ type:'[Cart]- Update-products-in-cart', payload:[...state.cart, product] })

 // acumular 

  const updatedProduct = state.cart.map(p=>{
    if( p._id !== product._id ) return p;
    if( p.size !== product.size ) return p;

    p.quantity += product.quantity;
    return p;
  } )

  dispatch({ type:'[Cart]- Update-products-in-cart',payload: updatedProduct })

}
const updateCartQuantity = (product: ICartProduct)=>{
dispatch({type:'[Cart]- Change-cart-quantity',payload:product})
}
return(
 <CartContext.Provider value={{
    ...state,


    //Methods
    addProductCart,
    updateCartQuantity
    }} >
    { children }
 </CartContext.Provider>
)
 }
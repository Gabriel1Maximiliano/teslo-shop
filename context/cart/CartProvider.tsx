import { FC, useEffect, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';
import Cookie from 'js-cookie';
import { AnyNaptrRecord } from 'dns';


export interface CartState {
  isLoaded:boolean;
    cart:ICartProduct[] | [];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const Cart_Initial_State:CartState={
  isLoaded:false,
    cart:[],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  }

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

    useEffect(() => {
     const numberOfItems= state.cart.reduce( ( prev:number,current: any ) => current.quantity + prev,0 )
     const subTotal = state.cart.reduce(( prev:number,current: any ) => (current.price * current.quantity)+ prev,0);
     const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE )
      const orderSummary = {
        numberOfItems,
        subTotal,
        tax: subTotal *taxRate,
        total: subTotal + ( taxRate +1 ) 
      }
     dispatch( { type:'[Cart]- Update-order-summary',payload:orderSummary } )
      }
    , [state!.cart])
    
    

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

const removeCartProduct =( product:any )=>{
  console.log({product})
    dispatch({ type:'[Cart]- Remove-product-in-cart',payload:product })

}
return(
 <CartContext.Provider value={{
    ...state,


    //Methods
    addProductCart,
    updateCartQuantity,
    removeCartProduct
    }} >
    { children }
 </CartContext.Provider>
)
 }
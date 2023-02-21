import {  useEffect, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';

import Cookies from 'js-cookie';



export interface CartState {
  isLoaded:boolean;
    cart:ICartProduct[] | [];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?:ShippingAddress;
}

export interface ShippingAddress {
  firstName:string;
  lastName :string;
  address  :string;
  address2? :string;
  zip      :string;
  city     :string;
  country  :string;
  phone    :string;
}

const Cart_Initial_State:CartState={
  isLoaded:false,
    cart:[],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress:undefined
  }

export const CartProvider=({ children }:any):any =>{
    const [state, dispatch] = useReducer(cartReducer , Cart_Initial_State);
    const { cart=[] }= state

    useEffect(()=>{
  try {
    const CookieProducta = Cookies.get( 'cart') ? JSON.parse( Cookies.get( 'cart' )! ):[];
    dispatch( { type:'[Cart]-LoadCart-from-cookies | localStorage',payload:CookieProducta } );
  } catch (error) {
    dispatch( { type:'[Cart]-LoadCart-from-cookies | localStorage',payload:[] } );
  }
       
    },[])

    useEffect(() => {
   Cookies.set( 'cart', JSON.stringify( state.cart ) )
    }, [state!.cart])

    useEffect(() => {
     const numberOfItems= cart.reduce( ( prev:number,current: any ) => current.quantity + prev,0 )
     const subTotal = cart.reduce(( prev:number,current: any ) => (current.price * current.quantity)+ prev,0);
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


useEffect(() => {


  if( Cookies.get('firstName') ){
    const shippinAddress ={

      firstName:Cookies.get('firstName') || '',
      lastName :Cookies.get('lastName') || '',
      address  :Cookies.get('address') || '',
      address2 :Cookies.get('address2') || '',
      zip      :Cookies.get('zip') || '',
      city     :Cookies.get('city') || '',
      country  :Cookies.get('country') || '',
      phone    :Cookies.get('phone') || '',
      }
      dispatch({ type:'[Cart]-LoadAddress-from-Cookies',payload:shippinAddress })
  }
  

}, [])
    
    

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

    dispatch({ type:'[Cart]- Remove-product-in-cart',payload:product })

}

const updateAddress =(address:ShippingAddress)=>{

  Cookies.set('firstName',address.firstName);
    Cookies.set('lastName',address.lastName);
    Cookies.set('address',address.address);
   Cookies.set('address2',address.address2 || '');
    Cookies.set('zip',address.zip);
    Cookies.set('city',address.city);
    Cookies.set('country',address.country);
    Cookies.set('phone',address.phone);
    
dispatch({type:'[Cart]-Update Address',payload:address})
}
return(
 <CartContext.Provider value={{
    ...state,


    //Methods
    addProductCart,
    updateCartQuantity,
    removeCartProduct,
    updateAddress
    }} >
    { children }
 </CartContext.Provider>
)
 }
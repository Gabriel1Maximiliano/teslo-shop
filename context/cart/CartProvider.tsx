import {  useEffect, useReducer } from 'react';
import { CartContext,cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';

import Cookies from 'js-cookie';
import { ShippingAddress } from 'interfaces';
import { tesloApi } from 'api';
import axios from 'axios';




export interface CartState {
  isLoaded:boolean;
    cart:ICartProduct[] | [];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?:ShippingAddress;
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
        total: subTotal * ( taxRate +1 ) 
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

const createOrder= async ()=>{

  if( !state.shippingAddress ){
    throw new Error('There is no delivery direction')
  }

  const body: any={

    orderItems:state.cart.map(( p )=>({
         ...p,
         size:p.size!
    })),
    shippingAddress:state.shippingAddress,
    numberOfItems:state.numberOfItems,
    subTotal:state.subTotal,
    tax:state.tax,
    total:state.total,
    isPaid:false

  }


  try{

    const {data} = await tesloApi.post('/orders',body)
//TODO vaciar carro limpair sstate
     dispatch({ type:'[Cart]-Order-Complete' });

return {
  hasError: false,
  message: data._id
}

  }catch(error){
if( axios.isAxiosError(error) ){
  return {
    hasError: true,
    message: error.response?.data.message
   }
  }

  return {
    hasError:true,
    message:'Uncontrolled error, talk to admin'
  }
}

  
}
  

return(
 <CartContext.Provider value={{
    ...state,


    //Methods
    addProductCart,
    updateCartQuantity,
    removeCartProduct,
    updateAddress,

    //Oreders
    createOrder
    }} >
    { children }
 </CartContext.Provider>
)
 }



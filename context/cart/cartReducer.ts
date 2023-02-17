

import { CartState } from './CartProvider';
import { ICartProduct } from 'interfaces';

type UITypeAtion =
|{type:'[Cart]-LoadCart-from-cookies | localStorage',payload:ICartProduct[]}
|{type:'[Cart]- Update-products-in-cart',payload:ICartProduct[]}
|{type:'[Cart]- Change-cart-quantity',payload:ICartProduct}
|{type:'[Cart]- Remove-product-in-cart',payload:ICartProduct}

export const cartReducer = ( state:CartState,action: UITypeAtion ):CartState => {
  
  switch (action.type) {
    case '[Cart]-LoadCart-from-cookies | localStorage':
      return{
        ...state,
        cart: [...action.payload]
        
      }
      case '[Cart]- Update-products-in-cart':

      return {
        ...state,
        cart:[...action.payload]
      }
      case '[Cart]- Change-cart-quantity':
      return {
        ...state,
        cart:state.cart.map( product =>{
          if( product._id !== action.payload._id ) return product
          if( product._id !== action.payload.size ) return product

          return action.payload;
        } )
      }
      case '[Cart]- Remove-product-in-cart':

 

      return {
        ...state,
       cart:state.cart.filter( p=> !((p.size === action.payload.size) && (p._id === action.payload._id))  ) 
      }


    default:
        return state;
  }
}

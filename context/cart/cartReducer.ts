

import { CartState } from './CartProvider';
import { ICartProduct } from 'interfaces';

type UITypeAtion =
|{type:'[Cart]-LoadCart-from-cookies | localStorage',payload:ICartProduct[]}
|{type:'[Catrt]- Update-products-in-cart',payload:ICartProduct[]}

export const cartReducer = ( state:CartState,action: UITypeAtion ):CartState => {
  
  switch (action.type) {
    case '[Cart]-LoadCart-from-cookies | localStorage':
      return{
        ...state,
        
      }
      case '[Catrt]- Update-products-in-cart':

      return {
        ...state,

        cart:[...action.payload]
      }


    default:
        return state;
  }
}



import { CartState } from './CartProvider';
import { ICartProduct } from 'interfaces';

type UITypeAtion =
|{type:'[Cart]-LoadCart-from-cookies | localStorage'}
|{type:'[Cart]-Add-Product',payload:ICartProduct}

export const cartReducer = ( state:CartState,action: UITypeAtion ):CartState => {
  
  switch (action.type) {
    case '[Cart]-LoadCart-from-cookies | localStorage':
      return{
        ...state,
        
      }


    default:
        return state;
  }
}

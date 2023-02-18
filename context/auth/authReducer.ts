

import { AuthState } from './AuthProvider';
import { IUser } from '../../interfaces/user';

type UITypeAtion =
|{type:'[Auth]-Login',payload:IUser}
|{type:'[Auth]-Logout'}

export const authReducer = ( state:AuthState,action: UITypeAtion ):AuthState => {
  
  switch (action.type) {
    case '[Auth]-Login':
      return{
        ...state,
        isLoggedIn:true,
        user:action.payload
        
      }
      case '[Auth]-Logout':
        return{
          ...state,
          isLoggedIn:false,
          user:undefined
          
        }


    default:
        return state;
  }
}

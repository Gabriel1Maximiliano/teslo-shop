import { FC, useReducer } from 'react';
import { AuthContext,authReducer } from './';
import { IUser } from '../../interfaces/user';


export interface AuthState {
    isLoggedIn:boolean;
    user?:IUser
}

const Auth_Initial_State:AuthState={
    isLoggedIn:false,
    user:undefined
}

export const AuthProvider =({ children }:any):any=>{

    const [state, dispatch] = useReducer(authReducer , Auth_Initial_State)

return(
 <AuthContext.Provider value={{
    ...state,


    //Methods
 }} >
    { children }
 </AuthContext.Provider>
)
 }
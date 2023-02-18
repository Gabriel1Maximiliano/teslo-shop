import { FC, useReducer } from 'react';
import { AuthContext,authReducer } from './';
import { IUser } from '../../interfaces/user';
import { tesloApi } from 'api';
import Cookies from 'js-cookie';
import axios from 'axios';


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

const loginUser= async(email:string, password:string):Promise<boolean>=>{

    try {
        const { data } = await tesloApi.post('/user/login',{email,password}) 

        const { token, user } = data;

        Cookies.set('token',token)
        dispatch({ type:'[Auth]-Login',payload:user })
        return true
    } catch (error) {
        return false;
    }

}

const registerUser = async( name:string,email:string,password:string, ): Promise<{hasError:boolean;message?:string}>=>{
  try {
    const { data } = await tesloApi.post('/user/register',{name,email,password}) 

    const { token, user } = data;

        Cookies.set('token',token)
        dispatch({ type:'[Auth]-Login',payload:user })
        //TODO return

        return {
            hasError:false,
        }
  } catch (error) {
    if( axios.isAxiosError(error) ){
        return {
            hasError:true,
            message:error.response?.data.message
        }
    }

    return {
        hasError:true,
        message:'Could not create the user try again'
    }
  }
}
return(
 <AuthContext.Provider value={{
    ...state,


    //Methods
    loginUser,
    registerUser,
 }} >
    { children }
 </AuthContext.Provider>
)
 }
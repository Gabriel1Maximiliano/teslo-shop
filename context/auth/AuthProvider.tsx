import {  useReducer, useEffect } from 'react';
import { AuthContext,authReducer } from './';
import { IUser } from '../../interfaces/user';
import { tesloApi } from 'api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"


export interface AuthState {
    isLoggedIn:boolean;
    user?:IUser
}

const Auth_Initial_State:AuthState={
    isLoggedIn:false,
    user:undefined
}

export const AuthProvider =({ children }:any):any=>{

const router = useRouter();

const { data,status } = useSession();


useEffect(() => {
if( status === 'authenticated' ){
  dispatch({ type:'[Auth]-Login',payload:data?.user as IUser })
}  

  
}, [status,data])

// useEffect(() => {

//   checkToken();
// }, [])
    
const checkToken =async()=>{

    if( !Cookies.get('token') ) return;
    try {
        const { data } = await tesloApi.get('/user/validate-token') 

        const { token, user } = data;

        Cookies.set('token',token)
        dispatch({ type:'[Auth]-Login',payload:user })
    } catch (error) {
       Cookies.remove('token')
    }
}
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

const logout =()=>{
    Cookies.remove('token');
    Cookies.remove('cart');

      Cookies.remove('lastName') 
      Cookies.remove('address') 
      Cookies.remove('address2')
      Cookies.remove('zip') 
      Cookies.remove('firstName')
      Cookies.remove('city') 
      Cookies.remove('country') 
      Cookies.remove('phone') 

    router.reload();
}
return(
 <AuthContext.Provider value={{
    ...state,


    //Methods
    loginUser,
    registerUser,
    logout,
 }} >
    { children }
 </AuthContext.Provider>
)
 }
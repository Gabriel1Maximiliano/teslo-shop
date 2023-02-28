import  ErrorOutline  from '@mui/icons-material/ErrorOutline';
import  Chip  from '@mui/material/Chip';
import { getSession, signIn } from "next-auth/react";
import { AuthLayout } from 'components/layouts';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { validations } from 'utils';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { GetServerSideProps } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


type FormData = {
    name:string;
    email   : string;
    password: string;
  };
const RegisterPage = () => {

   const router =  useRouter();

   const { registerUser } =useContext( AuthContext );
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [ showError,setShowError ] =useState(false);
    const [ errorMessage,setErrorMessage ] =useState('');

const onRegisterUser =async({name,email,password}:FormData)=>{
    setShowError(false);

    const { hasError,message } = await registerUser(name,email, password);

    if( hasError ){
        setShowError(false);
        setErrorMessage( message! )
        setTimeout(()=>setShowError(true),3000)
        return;
    }
    // const destination = router.query.p?.toString() || '/'
    // router.replace(destination);
    await signIn('credentials',{ email,password });
}
  return (
    <AuthLayout title={'Ingresar'}  >
         <form onSubmit={handleSubmit(onRegisterUser)} noValidate>       
        <Box  display='flex' 
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
       
        sx={{flexDirection: { xs:'column', sm:'column'}}}
        >
           
           <Chip 
                    label='No reconocemos usuario/ contrseña'
                    color='error'
                    icon={<ErrorOutline />}
                    className='fadeIn'
                    sx={{ display:showError ? 'flex':'none'  }}
                    />
               

           <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>

                <Grid item xs={12} sx={{mt: 3 }}  >
                    <TextField 
                    label="Nombre completo" 
                    variant="filled" 
                    fullWidth 
                    {...register('name',{
                        required:'This field is required',
                        minLength:{value:3,message:'At least 3 letters'}
                    })} 
                     error={ !!errors.name }
                helperText={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 3 }}>
                    <TextField 
                    label="Correo" 
                    variant="filled"
                    type='email'
                    fullWidth
                    {...register('email', {required:'This field is required',
                    validate:validations.isEmail })}
                    error={ !!errors.email }
                    helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 3 }}>
                    <TextField 
                    label="Contraseña" 
                    type='password' 
                    variant="filled" 
                    fullWidth 
                    {...register('password',{
                        required:'This field is required',
                        minLength:{value:6,message:'At least 3 letters'}
                    })} 
                     error={ !!errors.password }
                helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type='submit' color="secondary" sx={{ backgroundColor:'#274494',mt: 3 }} className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end' sx={{mt: 3 }}>
                    <NextLink
                   href={router.query.p ? `/auth/login?p=${ router.query.p }` :'/auth/login' }
                     passHref 
                     legacyBehavior>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
           
        </Box>
             
        </form>        
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}

export default RegisterPage;
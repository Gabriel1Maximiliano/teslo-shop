
import { useForm } from "react-hook-form";
import NextLink from 'next/link';

import { AuthLayout } from 'components/layouts';
import   ErrorOutline from "@mui/icons-material/ErrorOutline";
import { validations } from 'utils';

import {  useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn,getProviders } from "next-auth/react";

import { GetServerSideProps } from 'next';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

type FormData = {
    email   : string,
    password: string,
  };
const LoginPage = () => {

    // const { loginUser }=useContext( AuthContext );
    const [providers, setProviders] = useState<any>({});
  const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [ showError,setShowError ] =useState(false);

    useEffect(() => {
     getProviders().then(prov=>{
         console.log({providers:prov})
        setProviders( prov )
     })
      
    }, [])
    

const onLogginUser=async({ email,password }:FormData)=>{

    // const isValidLogin = await loginUser(email, password);

    // if( !isValidLogin ){
    //     setShowError(false);
    //     setTimeout(()=>setShowError(true),3000)
    //     return;
    // }
    // const destination = router.query.p?.toString() || '/'
    // router.replace(destination);

    await signIn('credentials',{ email,password });
  }
  return (
    <AuthLayout title={'Ingresar'}  >
        <form onSubmit={handleSubmit(onLogginUser)} noValidate>       
     <Box  display='flex' 
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
       
        sx={{flexDirection: { xs:'column', sm:'column'}}}
        >
           
                <Grid item xs={12}  sx={{mt: 3 }} >
                    <Typography variant='h1'   justifyContent='center' component="h1">Iniciar Sesión</Typography>
                    <Chip 
                    label='No reconocemos usuario/ contrseña'
                    color='error'
                    icon={<ErrorOutline />}
                    className='fadeIn'
                    sx={{ display:showError ? 'flex':'none'  }}
                    />
                </Grid>

                <Grid item xs={12}  sx={{mt: 3 }} >
                    <TextField 
                    type='email'
                    label="Correo"  
                    variant="filled" 
                    fullWidth
                    {...register('email', {required:'This field is required',
                    validate:validations.isEmail

                })}

                error={ !!errors.email }
                helperText={errors.email?.message}
              
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 3 }} >
                    <TextField 
                    label="Contraseña" 
                    type='password' 
                    variant="filled" 
                    fullWidth
                    {...register('password',{
                        required:'This field is required',
                        minLength:{value:3,message:'At least 3 letters'}
                    })} 
                     error={ !!errors.password }
                helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12} >
                    <Button
                    type='submit' 
                    color="secondary" 
                    sx={{ backgroundColor:'#274494',mt: 3 }} 
                     className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end' sx={{mt: 3 }} >
                    <NextLink 
                    href={router.query.p ? `/auth/register?p=${ router.query.p }` :'/auth/register' }
                    passHref 
                    legacyBehavior
                    >
                        <Link underline='always'>
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end' sx={{mt: 3 }} >
                    <Divider sx={{width:'100%',mb:'2'}} />

                  {
                    Object.values( providers ).map( ( provider:any )=>{

                        if( provider.id === 'credentials' ) return <div key='credentials' ></div>
                        return (
                            <Button key={ provider.id } 
                            variant='outlined'
                            fullWidth
                            className='circular-btn' size='large'
                            sx={{mb:1,color:'black',backgroundColor:'grey',widht:'100%'}}
                            onClick={ ()=>signIn(provider.id) }
                            
                            >{ provider.name }</Button>
                        )
                    } )
                  }
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

export default LoginPage;


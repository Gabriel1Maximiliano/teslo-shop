
import { useForm, SubmitHandler } from "react-hook-form";
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from 'components/layouts';
import { ConstructionOutlined } from "@mui/icons-material";
import { validations } from 'utils';

type FormData = {
    email   : string,
    password: string,
  };
const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onLogginUser=(data:FormData)=>{
  console.log({data})
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
                        minLength:{value:6,message:'At least 3 letters'}
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
                    <NextLink href="/auth/register" passHref legacyBehavior>
                        <Link underline='always'>
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
           
        </Box>
             
        </form>
     
    </AuthLayout>
  )
}

export default LoginPage;

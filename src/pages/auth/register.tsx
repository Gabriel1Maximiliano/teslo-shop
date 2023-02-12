import { Box, Grid, Typography,Link, TextField, Button } from '@mui/material';
import { AuthLayout } from 'components/layouts';
import NextLink from 'next/link';
import React from 'react'

const RegisterPage = () => {
  return (
    <AuthLayout title={'Ingresar'}  >
        
        <Box  display='flex' 
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
       
        sx={{flexDirection: { xs:'column', sm:'column'}}}
        >
           
               

           <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>

                <Grid item xs={12} sx={{mt: 3 }}  >
                    <TextField label="Nombre completo" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sx={{mt: 3 }}>
                    <TextField label="Correo" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sx={{mt: 3 }}>
                    <TextField label="Contraseña" type='password' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" sx={{ backgroundColor:'#274494',mt: 3 }} className='circular-btn' size='large' fullWidth>
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end' sx={{mt: 3 }}>
                    <NextLink href="/auth/login" passHref legacyBehavior>
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
           
        </Box>
             
             
    </AuthLayout>
  )
}

export default RegisterPage;
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ShopLayouts } from '../../../components/layouts/ShopLayouts';
import { GetServerSideProps } from 'next'
import { jwt } from 'utils';
import { countries } from '../../../utils/countries';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../../context/cart/CartContext';


interface FormData {

    firstName:string;
    lastName :string;
    address  :string;
    address2? :string;
    zip      :string;
    city     :string;
    country  :string;
    phone    :string;
}

const getAddressFromCookies = ():FormData=>{

    return {
    firstName:Cookies.get('firstName') || '',
    lastName :Cookies.get('lastName') || '',
    address  :Cookies.get('address') || '',
    address2 :Cookies.get('address2') || '',
    zip      :Cookies.get('zip') || '',
    city     :Cookies.get('city') || '',
    country  :Cookies.get('country') || '',
    phone    :Cookies.get('phone') || '',
    }
}

const AdressPage = () => {

    const { updateAddress } = useContext(CartContext);

const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<FormData>({
        defaultValues:{
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].code,
            phone: '',
        }
    
    });

useEffect(() => {
  reset( getAddressFromCookies() );
}, [reset])
    
const onSubmitAdress =(data:FormData)=>{
updateAddress( data )

    router.push('/checkout/summary');
}
  return (
    
    <ShopLayouts title='Dirección' pageDescription='Confirmar dirección de destino'>
    <form onSubmit={ handleSubmit(onSubmitAdress) } >
       <Typography variant="h1" component='h1'>Dirección</Typography>
       <Grid container spacing={ 2 } sx={{ mt: 2 }}>
    
    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Nombre'
         variant="filled" 
         fullWidth 
         {...register('firstName', {required:'The name is required',

     })}

     error={ !!errors.firstName }
     helperText={errors.firstName?.message}
         />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Apellido' 
        variant="filled" 
        fullWidth 
        {...register('lastName', {required:'The lastname is required',

    })}

    error={ !!errors.lastName }
    helperText={errors.lastName?.message}
        />
    </Grid>

    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Dirección' 
        variant="filled" 
        fullWidth 
        {...register('address', {required:'The address is required',

    })}

    error={ !!errors.address }
    helperText={errors.address?.message}
        />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Dirección 2 (opcional)' 
        variant="filled" 
        fullWidth 
        {...register('address')}
        />
    </Grid>

    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Código Postal' 
        variant="filled" 
        fullWidth
        {...register('zip', {required:'The zip is required',

    })}

    error={ !!errors.zip }
    helperText={errors.zip?.message}
        />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Ciudad' 
        variant="filled" 
        fullWidth 
        {...register('city', {required:'The city is required',

    })}

    error={ !!errors.city }
    helperText={errors.city?.message}
        />
    </Grid>
    
    <Grid item xs={12} sm={ 6 }>
        <FormControl fullWidth>
            <TextField
            select
                variant="filled"
                label="País"
                defaultValue={countries[0].code}
                {...register('country', {required:'The country is required',

            })}
        
            error={ !!errors.country }
           
            >{
                countries.map( country=>(
                    <MenuItem key={ country.code }value={ country.code }>{ country.name }</MenuItem>

                ) )
            }
              
            </TextField>
        </FormControl>
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField 
        label='Teléfono' 
        variant="filled" 
        fullWidth 
        {...register('phone', {required:'The phone is required',

    })}

    error={ !!errors.phone }
    helperText={errors.phone?.message}
        />
    </Grid>

</Grid>


<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
    <Button type='submit' color="secondary" sx={{ backgroundColor:'#274494' }} className="circular-btn" size="large">
        Revisar pedido
    </Button>
</Box>
</form>
    </ShopLayouts>
  )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time



// export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
//     const { token='' } = req.cookies;
//   let userId ='';
//   let isValidToken =false;

//   try {

//     userId = await jwt.isValidToken( token );
//     isValidToken=true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if(!isValidToken){
//    return {
//     redirect:{
//         destination:'/auth/login?p=/checkout/address',
//         permanent:false,
//     }
//    }
//   }
//     return {
//         props: {
            
//         }
//     }
// }
export default AdressPage;

// import { NextFetchEvent, NextRequest } from "next/server";
// import { jwt } from "utils";
// import { NextResponse } from 'next/server';


// export async function middleware(req:NextRequest,ev:NextFetchEvent){
//     const allCookies = req.cookies.getAll()
//    const token = allCookies[1].value
  
//     // return new Response( 'Token: '+token );

//     try{
//       //  await jwt.isValidToken( token );
//         const response = NextResponse.next();
//         return response;
//     }catch{


//         return NextResponse.redirect('/auth/checkout/summary')
//     }
// } 
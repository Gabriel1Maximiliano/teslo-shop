import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/cart/CartContext';
import { countries } from 'utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';




const SummaryPage = () => {
    const router = useRouter();

    const { shippingAddress,numberOfItems,createOrder }=useContext( CartContext );
const [isPosting, setIsPosting] = useState( false );
const [errorMessage, setErrorMesagge] = useState('');

    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);
    


    if ( !shippingAddress ) {
        return <>hola</>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;


const onCreateOrder = async()=>{
    setIsPosting( true );


    const data = await createOrder();// todo:depende de lo que hgaag
    

    if( data?.hasError ){

        setIsPosting(false);
        setErrorMesagge( data.message );
        return;
    }

    router.replace(`/orders/${ data?.message }`)

   
}
   return (

    <ShopLayouts title='Resumen de compra' pageDescription={'Resumen de la órden'}>
        <Typography variant='h1' component='h1'>Resumen de la órden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* <CartList editable /> */}
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen({ numberOfItems } {numberOfItems ?'productos' :'productos'})</Typography>
                        <Divider sx={{ my:1 }} />

                            <Box display='flex'  justifyContent='end'>
                                <NextLink href='/checkout/address' passHref legacyBehavior >
                                    <Link underline='always' >
                                    Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <Typography variant='subtitle1' >{ lastName } { firstName }</Typography>
                            <Typography variant='subtitle1' >{ address }{`${ address2 }`}</Typography>
                            <Typography variant='subtitle1' >{ city }, { zip }</Typography>
                            <Typography variant='subtitle1' >{countries.find( c=>c.code === country )?.name }</Typography>
                            <Typography variant='subtitle1' >{phone}</Typography>
                            
                            <Divider sx={{ my:1 }} />

                            <Box display='flex'  justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior >
                                    <Link underline='always' >
                                    Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrdenSummary />

                        <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                            <Button 
                            sx={{ backgroundColor:'#274494' }}
                             className='circular-btn' 
                             fullWidth
                             onClick={ onCreateOrder }
                             disabled={ isPosting }
                             >
                                Confirmar Órden
                            </Button>

                        <Chip
                        color='error'
                        label={ errorMessage }
                        sx={ { display: errorMessage ? 'flex' :'none',mt:1 }}
                        />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


     </ShopLayouts>
  )
}

export default SummaryPage;
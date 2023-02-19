import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import { useContext } from 'react';
import { CartContext } from '../../../context/cart/CartContext';
import { countries } from 'utils';




const SummaryPage = () => {

    const { shippingAddress,numberOfItems }=useContext( CartContext );

    if( !shippingAddress ){
        return <></>
    }
    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;
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

                        <Box sx={{ mt: 3 }}>
                            <Button sx={{ backgroundColor:'#274494' }} className='circular-btn' fullWidth>
                                Confirmar Órden
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayouts>
  )
}

export default SummaryPage;
import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';




const OrderPage = () => {
  return (
    <ShopLayouts title='Resumen de la órden (id)1121' pageDescription={'Resumen de la órden'}>
        <Typography variant='h1' component='h1'>Órden: abc</Typography>

        {/* <Chip 
        sx={{ my:2 }}
        label='No pagar'
        color='error'
        icon={ <CreditCardOffOutlined /> }
        
        /> */}

       <Chip 
        sx={{ my:2 }}
        label='Órden pagada'
        color='success'
        icon={ <CreditScoreOutlined /> }
        
        />

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* <CartList editable /> */}
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my:1 }} />

                            <Box display='flex'  justifyContent='end'>
                                <NextLink href='/checkout/address' passHref legacyBehavior >
                                    <Link underline='always' >
                                    Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <Typography variant='subtitle1' >Loza Gabriel</Typography>
                            <Typography variant='subtitle1' >323 Algún lugar</Typography>
                            <Typography variant='subtitle1' >Buenos Aires</Typography>
                            <Typography variant='subtitle1' >Argentina</Typography>
                            <Typography variant='subtitle1' >+54 1122222</Typography>
                            
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
                            {/* todo */}
                           <h1>Pagar</h1>
                           <Chip 
                            sx={{ my:2 }}
                            label='Órden pagada'
                            color='success'
                            icon={ <CreditScoreOutlined /> }
                            
                            />
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayouts>
  )
}

export default OrderPage;
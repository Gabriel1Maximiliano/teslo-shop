import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";



const SummaryPage = () => {
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
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";


const HomeCartPage = () => {
  return (
    <ShopLayouts title='Carrito - 3' pageDescription={'Carrito de compras de la tienda'}>
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* <CartList editable /> */}
                <CartList editable />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ my:1 }} />

                        {/* <OrderSummary /> */}
                            <OrdenSummary />
                        <Box sx={{ mt: 3 }}>
                            <Button sx={{ backgroundColor:'#274494' }} className='circular-btn' fullWidth>
                                Checkout
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayouts>
  )
}

export default HomeCartPage;
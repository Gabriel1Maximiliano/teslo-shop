import  Typography  from "@mui/material/Typography";
import  Grid from "@mui/material/Grid";
import  Divider from "@mui/material/Divider";
import  CardContent from "@mui/material/CardContent";
import   Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import  Box  from "@mui/material/Box";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import { useContext, useEffect } from 'react';
import { CartContext } from '../../../context/cart/CartContext';
import { useRouter } from 'next/router';


const HomeCartPage = () => {
const router = useRouter();
const { isLoaded,cart} = useContext( CartContext );


 useEffect(() => {
   
 if( isLoaded && cart.length === 0 ){
    router.replace('/cart/empty');
 }
}, [isLoaded,cart,router])

if( !isLoaded || cart.lenght === 0){
    return <></>
}
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
                            <Button 
                            sx={{ backgroundColor:'#274494' }}
                             className='circular-btn' 
                             fullWidth
                             href='/checkout/address'
                             >
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
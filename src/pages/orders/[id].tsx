

import { Box ,Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import  CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import  CreditScoreOutlined  from '@mui/icons-material/CreditScoreOutlined';


import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrder } from 'database';
import { IOrder } from 'interfaces';

interface Props {
    order:IOrder;
}


const OrderPage:NextPage<Props> = (props) => {


 
  return (
    <ShopLayouts title='Resumen de la órden' pageDescription={'Resumen de la órden'}>
        <Typography variant='h1' component='h1'>Órden: {props.order._id}</Typography>

       
    {
        props.order.isPaid 
        ? (
            <Chip 
            sx={{ my:2 }}
            label='Órden ya fue pagada'
            color='success'
            icon={ <CreditScoreOutlined /> }
            
            />
        ):(
            <Chip 
            sx={{ my:2 }}
            label='Pendiente de pago'
            color='error'
            icon={ <CreditCardOffOutlined /> }
            
            /> 
        )

    }
      

        <Grid container className='fadeIn' >
            <Grid item xs={ 12 } sm={ 7 }>
                {/* <CartList editable /> */}
                <CartList 
               products ={ props.order.orderItems }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ props.order.numberOfItems } { props.order.numberOfItems > 1 ? 'peoductos' : 'producto' })</Typography>
                        <Divider sx={{ my:1 }} />

                            <Box display='flex'  justifyContent='end'>
                                
                            </Box>
                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.firstName} { props.order.shippingAddress.lastName }</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.address} { props.order.shippingAddress.address2  ? `${ props.order.shippingAddress.address }` :''}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.city}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.country}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.phone}</Typography>
                            
                            <Divider sx={{ my:1 }} />

                            <OrdenSummary 
                             orderValues={props.order}
                            
                            />

                        <Box sx={{ mt: 3 ,diplay:'flex' ,flexDirection:'column'}}  >
                            {/* todo */}
                          {
                           props.order.isPaid
                            ?(
                                <Chip 
                                sx={{ my:2 }}
                                label='Órden pagada'
                                color='success'
                                icon={ <CreditScoreOutlined /> }
                                
                                />
                            ):(
                                <h1>Pagar</h1>
                            )
                          }
                          
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayouts>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req,query})=>{
 const { id='' } = query;
const session:any = await getSession({ req });


if( !session ){
 return {
    redirect:{
        destination:`/auth/login?p=/orders${ id }`,
        permanent:false,
    }
 }
}



const order = await dbOrder.getOrderById( id.toString() );

if( order.user !== session.user!._id ){

  return {
    redirect:{
        destination:'/orders/history',
        permanent:false,
    }
  }
}
    return {
        props:{
            order
        }
    }
}

export default OrderPage;
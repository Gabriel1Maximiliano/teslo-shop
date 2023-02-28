
import  Box from '@mui/material/Box';
import  Card from '@mui/material/Card';
import  CardContent from '@mui/material/CardContent';
import  Chip from '@mui/material/Chip';
import  CircularProgress from '@mui/material/CircularProgress';
import  Divider from '@mui/material/Divider';
import  Grid from '@mui/material/Grid';
import  Typography  from "@mui/material/Typography";
import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { ShopLayouts } from "components/layouts";
import  CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import  CreditScoreOutlined  from '@mui/icons-material/CreditScoreOutlined';

import { PayPalButtons } from "@paypal/react-paypal-js";
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrder } from 'database';
import { IOrder } from 'interfaces';
import tesloApi from '../../../api/tesloApi';
import { useRouter } from "next/router";
import { useState } from "react";

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED";
};

interface Props {
    order:IOrder;
}


const OrderPage:NextPage<Props> = (props) => {

const router = useRouter();

const { total } = props.order

const [isPaying, setIsPaying] = useState(false);

const onOrderCompleted = async( details : OrderResponseBody )=>{
if( details.status !== 'COMPLETED' ){
  return alert('No hay pago Paypal')
}
setIsPaying( true );
try {
    const { data } = await tesloApi.post(`/orders/pay`,{
        transactionId:details.id,
        orderId:props.order._id!
    })

    router.reload();

} catch (error) {
    setIsPaying( false );
    console.log(error);
    alert('Error')
}
}
 
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
                        <Typography variant='h2'>Resumen ({ props.order.numberOfItems } { props.order.numberOfItems > 1 ? 'productos' : 'producto' })</Typography>
                        <Divider sx={{ my:1 }} />

                            <Box display='flex'  justifyContent='end'>
                                
                            </Box>
                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.address} { props.order.shippingAddress.address2  ? `${ props.order.shippingAddress.address }` :''}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.firstName} { props.order.shippingAddress.lastName }</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.city}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.country}</Typography>
                            <Typography variant='subtitle1' >{props.order.shippingAddress.phone}</Typography>
                            
                            <Divider sx={{ my:1 }} />

                            <OrdenSummary 
                             orderValues={props.order}
                            
                            />

                        <Box sx={{ mt: 3 ,diplay:'flex' ,flexDirection:'column'}}  >
                            {/* todo */}
                            
                            <Box 
                            display='flex' 
                            justifyContent='center'
                            className="fadeIn"
                            sx={{ display: isPaying ? 'flex' :'none' }}
                            >
                            <CircularProgress />

                            </Box>
                                    
                            <Box flexDirection='column' sx={{ display: isPaying ? 'none' :'flex',flex:1 }} >
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
                                <PayPalButtons 
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: total.toString(),
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order!.capture().then((details) => {
                                        onOrderCompleted( details );
                                        // console.log({details})
                                        // const name = details.payer.name?.given_name;
                                        // alert(`Transaction completed by ${name}`);
                                    });
                                }}/>
                            )
                          }
                          
                            </Box>
                         
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
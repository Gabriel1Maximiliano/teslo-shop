import { CartList } from "components/cart";
import { OrdenSummary } from "components/cart/OrdenSummary";
import { AdminLayout } from "components/layouts";


import  CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import  CreditScoreOutlined  from '@mui/icons-material/CreditScoreOutlined';


import { GetServerSideProps, NextPage } from 'next';

import { dbOrder } from 'database';
import { IOrder } from 'interfaces';

import  AirplaneTicketOutlined  from "@mui/icons-material/AirplaneTicketOutlined";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

interface Props {
    order:IOrder;
}


const OrderPage:NextPage<Props> = (props) => {

    const { shippingAddress } = props.order;


    return (
      <AdminLayout 
          title='Resumen de la orden' 
          subtitle={ `OrdenId: ${ props.order._id }`}
          icon={ <AirplaneTicketOutlined /> }
      >
  
          {
              props.order.isPaid
              ? (
                  <Chip 
                      sx={{ my: 2 }}
                      label="Orden ya fue pagada"
                      variant='outlined'
                      color="success"
                      icon={ <CreditScoreOutlined /> }
                  />
              ):
              (
                  <Chip 
                      sx={{ my: 2 }}
                      label="Pendiente de pago"
                      variant='outlined'
                      color="error"
                      icon={ <CreditCardOffOutlined /> }
                  />
              )
          }
  
          
  
          <Grid container className='fadeIn'>
              <Grid item xs={ 12 } sm={ 7 }>
                  <CartList products={  props.order.orderItems } />
              </Grid>
              <Grid item xs={ 12 } sm={ 5 }>
                  <Card className='summary-card'>
                      <CardContent>
                          <Typography variant='h2'>Resumen ({ props.order.numberOfItems } { props.order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                          <Divider sx={{ my:1 }} />
  
                          <Box display='flex' justifyContent='space-between'>
                              <Typography variant='subtitle1'>Dirección de entrega</Typography>
                          </Box>
  
                          
                          <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                          <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
                          <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                          <Typography>{ shippingAddress.country }</Typography>
                          <Typography>{ shippingAddress.phone }</Typography>
  
                          <Divider sx={{ my:1 }} />
  
  
                          <OrdenSummary 
                              orderValues={{
                                  numberOfItems: props.order.numberOfItems,
                                  subTotal: props.order.subTotal,
                                  total: props.order.total,
                                  tax: props.order.tax,
                              }} 
                          />
  
                          <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                              {/* TODO */}
  
  
                              <Box display='flex' flexDirection='column'>
                                  {
                                      props.order.isPaid
                                      ? (
                                          <Chip 
                                              sx={{ my: 2, flex: 1 }}
                                              label="Orden ya fue pagada"
                                              variant='outlined'
                                              color="success"
                                              icon={ <CreditScoreOutlined /> }
                                          />
  
                                      ):(
                                          <Chip 
                                              sx={{ my: 2, flex: 1 }}
                                              label="Pendiente de pago"
                                              variant='outlined'
                                              color="error"
                                              icon={ <CreditCardOffOutlined /> }
                                          />
                                      )
                                  }
                              </Box>
  
                          </Box>
  
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>
  
  
      </AdminLayout>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req,query})=>{
    const { id = '' } = query;
    const order = await dbOrder.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}





export default OrderPage;
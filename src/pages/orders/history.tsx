

import NextLink from 'next/link';

import  Typography  from '@mui/material/Typography';
import  Grid from '@mui/material/Grid';
import  Chip from '@mui/material/Chip';
import  Link  from '@mui/material/Link';
import { DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import { ShopLayouts } from 'components/layouts';

import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrder } from 'database';
import { IOrder } from '../../../interfaces/Order';



interface Props {
 orders:IOrder[]
}


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams<any, any, any>) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams<any, any, any>) => {
            return (
               <NextLink href={`/orders/${ params.row.orderId }`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
               </NextLink>
            )
        }
    }
];


// const rows = [
//     { id: 1, paid: true, fullname: 'Fernando Herrera' },
//     { id: 2, paid: false, fullname: 'Melissa Flores' },
//     { id: 3, paid: true, fullname: 'Hernando Vallejo' },
//     { id: 4, paid: false, fullname: 'Emin Reyes' },
//     { id: 5, paid: false, fullname: 'Eduardo Rios' },
//     { id: 6, paid: true, fullname: 'Natalia Herrera' },
// ]


const HistoryPage:NextPage<Props> = ({orders}) => {
  const rows = orders.map( ( order,index )=>{
      return   {
    id:index+1,
    paid:order.isPaid,
    fullname:`${order.shippingAddress.firstName} ${order.shippingAddress.lastName} `,
    orderId: order._id,
}
} )

  return (
    <ShopLayouts title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


         <Grid container className='fadeIn' >
             <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
               
                    rows={ rows}
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid> 
        </Grid> 

    </ShopLayouts>
  )
}
export const getServerSideProps: GetServerSideProps = async ({req})=>{
   
   const session:any = await getSession({req}); 
 
   if( !session ){
    return {
        redirect:{
            destination:'/auth/login?p=/order/history',
            permanent:false
        }
    }
   }

   const orders = await dbOrder.getOrdersByUser( session.user._id ); 


    return {
        props:{
            orders
        }
    }
}
export default HistoryPage


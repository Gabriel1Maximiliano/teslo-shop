
import React from 'react';

import { AdminLayout } from '../../../components/layouts/AdminLayout';
import  DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import  CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import { SummaryTile } from 'components/admin';

import { Grid } from '@mui/material';
import  AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import  CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import  CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import  GroupOutlined from '@mui/icons-material/GroupOutlined';
import  CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import  ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import  AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';







const DashboardPage = () => {
  return (
   <AdminLayout title={'Dashboard'} subtitle={'Estadísticas generales'} icon={<DashboardOutlined />}>
 <Grid container spacing={2}>
            
            <SummaryTile 
                title=''//{ numberOfOrders }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ paidOrders }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ notPaidOrders }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ numberOfClients }
                subTitle="Clientes"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ numberOfProducts }
                subTitle="Productos"
                icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ productsWithNoInventory }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ lowInventory }
                subTitle="Bajo inventario"
                icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title=''//{ refreshIn }
                subTitle="Actualización en:"
                icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

        </Grid>
   </AdminLayout>
  

  
  )
}

export default DashboardPage
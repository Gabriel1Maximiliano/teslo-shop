import  Typography  from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

import { FC, useContext } from 'react';
import { currency } from "utils";
import { CartContext } from '../../context/cart/CartContext';


interface Props {
    orderValues?:{
        numberOfItems:number;
        subTotal:number;
        total:number;
        tax:number;
    }
}
export const OrdenSummary: FC<Props> = ({ orderValues }) => {
 
const { tax,subTotal,total,numberOfItems } = useContext( CartContext )

const summaryValues = orderValues ? orderValues : { tax,subTotal,total,numberOfItems }

  return (
    <Grid  container >
        <Grid item xs={ 6 }>
            <Typography>No Productos</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ summaryValues.numberOfItems } { summaryValues.numberOfItems > 1 ? 'productos': 'producto' } </Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ currency.format(summaryValues.subTotal) }</Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>Impuestos{(Number(process.env.NEXT_PUBLIC_TAX_RATE)*100)}%</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ currency.format(summaryValues.tax)}</Typography>
            
        </Grid>

        <Grid item xs={ 6 } sx={{mt:2}} >
            <Typography variant="subtitle1" >Total a pagar</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex' sx={{mt:2}}>
            <Typography>{currency.format(summaryValues.total)}</Typography>
            
        </Grid>
    </Grid>
  )
}

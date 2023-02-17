import { Grid, Typography } from "@mui/material"
import { useContext } from 'react';
import { currency } from "utils";
import { CartContext } from '../../context/cart/CartContext';

export const OrdenSummary = () => {
 
const { tax,subTotal,total,numberOfItems } = useContext( CartContext )
  return (
    <Grid  container >
        <Grid item xs={ 6 }>
            <Typography>No Productos</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ numberOfItems } { numberOfItems > 1 ? 'productos': 'producto' } </Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ currency.format(subTotal) }</Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>Impuestos{(Number(process.env.NEXT_PUBLIC_TAX_RATE)*100)}%</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ currency.format(tax)}</Typography>
            
        </Grid>

        <Grid item xs={ 6 } sx={{mt:2}} >
            <Typography variant="subtitle1" >Total a pagar</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex' sx={{mt:2}}>
            <Typography>{currency.format(total)}</Typography>
            
        </Grid>
    </Grid>
  )
}

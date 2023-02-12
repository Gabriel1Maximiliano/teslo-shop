import { Grid, Typography } from "@mui/material"


export const OrdenSummary = () => {
  return (
    <Grid  container >
        <Grid item xs={ 6 }>
            <Typography>No Productos</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>3</Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ `$${135}` }</Typography>
            
        </Grid>

        <Grid item xs={ 6 }>
            <Typography>Impuestos(15%)</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex'>
            <Typography>{ `$${35}` }</Typography>
            
        </Grid>

        <Grid item xs={ 6 } sx={{mt:2}} >
            <Typography variant="subtitle1" >Total a pagar</Typography>
        </Grid>
        <Grid item xs={ 6 }  display='flex' sx={{mt:2}}>
            <Typography>{ `$${170}` }</Typography>
            
        </Grid>
    </Grid>
  )
}

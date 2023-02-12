import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { ShopLayouts } from '../../../components/layouts/ShopLayouts';

const AdressPage = () => {
  return (
    <ShopLayouts title='Dirección' pageDescription='Confirmar dirección de destino'>
       <Typography variant="h1" component='h1'>Dirección</Typography>

<Grid container spacing={ 2 } sx={{ mt: 2 }}>
    
    <Grid item xs={12} sm={ 6 }>
        <TextField label='Nombre' variant="filled" fullWidth />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField label='Apellido' variant="filled" fullWidth />
    </Grid>

    <Grid item xs={12} sm={ 6 }>
        <TextField label='Dirección' variant="filled" fullWidth />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField label='Dirección 2 (opcional)' variant="filled" fullWidth />
    </Grid>

    <Grid item xs={12} sm={ 6 }>
        <TextField label='Código Postal' variant="filled" fullWidth />
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField label='Ciudad' variant="filled" fullWidth />
    </Grid>
    
    <Grid item xs={12} sm={ 6 }>
        <FormControl fullWidth>
            <Select
                variant="filled"
                label="País"
                value={1}
            >
                <MenuItem value={1}>Argentina</MenuItem>
                <MenuItem value={2}>Uruguay</MenuItem>
                <MenuItem value={3}>Chile</MenuItem>
                <MenuItem value={4}>Paraguay</MenuItem>
            </Select>
        </FormControl>
    </Grid>
    <Grid item xs={12} sm={ 6 }>
        <TextField label='Teléfono' variant="filled" fullWidth />
    </Grid>

</Grid>


<Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
    <Button color="secondary" sx={{ backgroundColor:'#274494' }} className="circular-btn" size="large">
        Revisar pedido
    </Button>
</Box>
    </ShopLayouts>
  )
}

export default AdressPage;
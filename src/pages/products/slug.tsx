import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayouts } from "components/layouts";
import { initialData } from '../../../database/products';

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayouts title="abc" pageDescription="..." >
        <Grid container spacing={ 3 } >
            <Grid item xs={ 12 } sm={ 7 }>
                {/* SlideShow */}
            </Grid>
            <Grid item xs={ 12 } sm={ 5 } >
                <Box display='flex' flexDirection='column'>
                      {/*titulos*/}

                      <Typography variant='h1' component='h1'>{ product.title }</Typography>
                      <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
                            {/*cantidad  */}
                            <Box sx={{ my:2 }} >
                                <Typography variant='subtitle2' >Cantidad</Typography>
                             {/* ItemCounter */}

                             {/* Agregar al carrito  */}
                             <Button sx={{ backgroundColor:'#274494' }}  color='error' className="circular-btn" >
                                Agregar al Carrito
                             </Button>

                             {/* <Chip label='No hay disponible' color="error" variant="outlined" /> */}
                             <Box sx={{ mt:3 }} >
                                <Typography variant='subtitle2' >Descripción</Typography>
                                <Typography variant='body2' >{ product.description }</Typography>
                             </Box>
                            </Box>

                </Box>
            </Grid>
        </Grid>
    </ShopLayouts>
  )
}

export default ProductPage;
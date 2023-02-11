import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayouts } from "components/layouts"
import NextLink from 'next/link';

const EmptyCartPage = () => {
  return (
    <ShopLayouts title="Carrito de compras vacío" pageDescription="No hay artículos en el carrito de compras">
         <Box  display='flex' 
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
        sx={{flexDirection: { xs:'column', sm:'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize:100 }} />
           <Box display='flex' flexDirection='column'alignItems='center' >
            <Typography marginLeft={ 2 } >Su carrito esta vacío</Typography>
            <NextLink href='/' passHref legacyBehavior>
                <Link typography='h4' color='secondary'>
                Regresar
                </Link>
            </NextLink>
           </Box>
        </Box>
    </ShopLayouts>
  )
}

export default EmptyCartPage
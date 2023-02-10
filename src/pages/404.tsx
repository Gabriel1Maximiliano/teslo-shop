import { Box, Typography } from "@mui/material"
import { ShopLayouts } from "components/layouts"


const Custom404 = () => {
  return (
    <ShopLayouts title="Page not found" pageDescription="There is no products to show here">
        <Box  display='flex' 
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
        sx={{flexDirection: { xs:'column', sm:'row' }}}
        >
           <Typography variant="h1" component="h1" fontSize={ 100 } fontWeight={ 200 }>404 |</Typography> 
           <Typography  marginLeft={2} >We can not find this page </Typography> 
        </Box>
    </ShopLayouts>
  )
}

export default Custom404
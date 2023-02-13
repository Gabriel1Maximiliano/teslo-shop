import { Box, CircularProgress, Typography } from "@mui/material"
import { ShopLayouts } from "components/layouts"


export const FullScreenLoading = () => {
  return (
    <ShopLayouts title="Loading..." pageDescription="There is a loading page">
        <Box  display='flex' 
        flexDirection='column'
        justifyContent='center'
        alignItems='center' 
        height='calc( 100vh - 200px )'
        
        >

        <Typography sx={ { mb:3 } } >Cargando  </Typography>
        <CircularProgress  thickness={ 2 } />
          
        </Box>
    </ShopLayouts>
  )
}

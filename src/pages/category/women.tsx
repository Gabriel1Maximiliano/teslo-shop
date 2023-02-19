import { Typography } from "@mui/material";
import { ShopLayouts } from "components/layouts";
import { ProductList } from "components/products";
import { FullScreenLoading } from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";

const WomenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');
  
  return (
    
  
    <ShopLayouts title={'Teslo-Shop-Women'} pageDescription={'Encuentra los mejores productos de Teslo-Shop para niños'}>
      <Typography variant='h1' component='h1' >Mujeres</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >Productos para mujeres</Typography>
      {
        isLoading 
            ? <FullScreenLoading />
            : <ProductList products={ products } />
      }
       
   </ShopLayouts>
  )
}

export default WomenPage;
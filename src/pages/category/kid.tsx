import  Typography  from "@mui/material/Typography";
import { ShopLayouts } from "components/layouts";
import { ProductList } from "components/products";
import { FullScreenLoading } from "components/ui/FullScreenLoading";
import { useProducts } from "hooks";


const KidsPage = () => {

  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    
  
    <ShopLayouts title={'Teslo-Shop-Kids'} pageDescription={'Encuentra los mejores productos de Teslo-Shop para niños'}>
      <Typography variant='h1' component='h1' >Niños</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >Productos para niños</Typography>
      {
        isLoading 
            ? <FullScreenLoading />
            : <ProductList products={ products } />
      }
       
   </ShopLayouts>
  )
}

export default KidsPage;
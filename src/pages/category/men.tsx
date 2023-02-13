import { Typography } from '@mui/material';
import { ProductList } from 'components/products';
import { FullScreenLoading } from 'components/ui/FullScreenLoading';
import { ShopLayouts } from '../../../components/layouts/ShopLayouts';
import { useProducts } from '../../../hooks/useProducts';




const MenPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayouts title={'Teslo-Shop-Men'} pageDescription={'Encuentra los mejores productos de Teslo-Shop para Hombres'}>
      <Typography variant='h1' component='h1' >Hombres</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >Productos para hombres</Typography>
      {
        isLoading 
            ? <FullScreenLoading />
            : <ProductList products={ products } />
      }
       
   </ShopLayouts>
  )
}

export default MenPage

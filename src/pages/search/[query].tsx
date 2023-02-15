import { Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products/ProductList'



const inter = Inter({ subsets: ['latin'] })

interface Props {
    products:IProduct[];
}

export default function SearchPage({ products }:Props) {

console.log('desde Search Page')
  console.log({products})
  
  return (
   <ShopLayouts title={'Teslo-Shop-Search'} pageDescription={'Encuentra los mejores productos de Teslo-Shop'}>
      <Typography variant='h1' component='h1' >Buscar Producto</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >ABC-123    </Typography>

        <ProductList products={ products } />
      
       
   </ShopLayouts>

  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import {  dbProducts } from 'database';
import { IProduct } from 'interfaces'


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {
    const { query } = params  as { query:string };  // your fetch function here ;


    if( query.length === 0  ){
        return {
            redirect:{
                destination : '/category/men',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query );
  
    const foundProducts = products.length > 0;

    
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt');
    }
    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

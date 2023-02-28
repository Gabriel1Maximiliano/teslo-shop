import  Typography  from '@mui/material/Typography'
import  Box from '@mui/material/Box'
import { Inter } from '@next/font/google'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products/ProductList'

import { GetServerSideProps } from 'next'
import {  dbProducts } from 'database';
import { IProduct } from 'interfaces'


const inter = Inter({ subsets: ['latin'] })

interface Props {
    products:IProduct[];
    foundProducts:boolean,
            query:string
}

export default function SearchPage({ products,foundProducts,query }:Props) {

console.log('desde Search Page')
  console.log({products})
  
  return (
    <ShopLayouts title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Buscar productos</Typography>

        {
            foundProducts 
                ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { query }</Typography>
                : (
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
                    </Box>
                )
        }

        

        
        <ProductList products={ products } />
        
    </ShopLayouts>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


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
        //products = await dbProducts.getAllProducts('shirt');
        products = await dbProducts.getProductsByTerm ('shirt');
    }
    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


import { Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products/ProductList'
import { initialData } from 'database/products'
import useSWR from "swr";

const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json())

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data, error, isLoading } = useSWR("/api/products", fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
console.log(data)

  return (
   <ShopLayouts title={'Teslo-Shop-Home'} pageDescription={'Encuentra los mejores productos de Teslo-Shop'}>
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >Todos los productos</Typography>

      
        <ProductList products={ data }        
        />
   </ShopLayouts>

  )
}

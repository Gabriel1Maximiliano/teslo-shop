
import { Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { ShopLayouts } from 'components/layouts'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <ShopLayouts title={'Teslo-Shop-Home'} pageDescription={'Encuentra los mejores productos de Teslo-Shop'}>
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={ {marginBottom:1 } } >Todos los productos</Typography>
   </ShopLayouts>
  )
}

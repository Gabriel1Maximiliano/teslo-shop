import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import { useMemo, useState } from 'react';
import { IProduct } from '../../interfaces/products';
import  NextLink from 'next/link';

interface Props {
  product:IProduct;
}
export const ProductCards = ({ product }:Props) => {

const [isHoover, setIsHoover] = useState(false);
const [ isImageLoaded,setIsImageLoaded ] = useState(false);

const productImage = useMemo(()=>{
  return isHoover 
  ?  `/products/${ product.images[0] }` 
  :  `/products/${ product.images[1] }`
},[isHoover,product.images])

  return (
    <Grid 
    item xs={ 6 }
     sm={ 4 }
     onMouseEnter={ ()=>setIsHoover( true ) }
     onMouseLeave={ () => setIsHoover( false ) }
     >
    <Card>
      <NextLink href="/products/slug" passHref prefetch={false} legacyBehavior>
        <Link>
      <CardActionArea>
        <CardMedia

        className='fadeIn'
        component='img'
        image={ productImage  }
        alt={ product.title }
        onLoad={ ()=>setIsImageLoaded( true ) }
        />
      </CardActionArea>
      </Link>
      </NextLink>
    </Card>

    <Box sx={{ mt:1,display: isImageLoaded ? 'block' :'none' }}   className="fadeIn">
      <Typography fontWeight={700}>{ product.title }</Typography>
      <Typography fontWeight={500}>{ `$${product.price}` }</Typography>
    </Box>
  </Grid>
  )
}



import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { initialData } from '../../database/seedData';
import { ItemCouter } from '../ui';
import { ICartProduct } from 'interfaces';
import { CartContext } from 'context/cart';
import { IOrderItem } from '../../interfaces/Order';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
    products?:IOrderItem[]
    
}

export const CartList: FC<Props> = ({ editable = false, products}) => {

     const { cart, updateCartQuantity,removeCartProduct} = useContext(CartContext);
 

     const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
         product.quantity = newQuantityValue;
         updateCartQuantity( product );
     }

    
    const productsToShow = products ? products : cart
    

  return (
    <>
        {
           productsToShow.map( (product:any) => (
                <Grid container spacing={2} key={ product.slug } sx={{ mb:1 }}>
                    <Grid item xs={3}>
                        {/* TODO: llevar a la página del producto /products/1473834-00-A_2_2000.jpg,/products/1473829-00-A_2_2000.jpg*/}
                        <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                     image={ `${ product.image }` || `${ cart[0].image }`  }
                                     //image={ `/products/1741416-00-A_0_2000.jpg`  }
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title }</Typography>
                            <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>

                            {
                                editable 
                                ? <ItemCouter
                                currentValue={product.quantity}
                                maxValue={ 10 }
                                onUpdatedQuantity={(value) =>  onNewCartQuantityValue( product,value ) }
                                />
                                : <Typography variant='h5'>3 items</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                        
                        {
                            editable && (
                                <Button 
                                variant='text'
                                sx={{ backgroundColor:'#274494' }} color='secondary' 
                                onClick={()=> removeCartProduct( product ) }
                                >
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}



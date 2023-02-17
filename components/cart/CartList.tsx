

import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCouter } from '../ui';
import { ICartProduct } from 'interfaces';
import { CartContext } from 'context/cart';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

     const { cart, updateCartQuantity,removeCartProduct} = useContext(CartContext);
     console.log(cart)

     const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
         product.quantity = newQuantityValue;
         updateCartQuantity( product );
     }
  return (
    <>
        {
            cart.map( (product:ICartProduct) => (
                <Grid container spacing={2} key={ product.slug } sx={{ mb:1 }}>
                    <Grid item xs={3}>
                        {/* TODO: llevar a la página del producto */}
                        <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                      image={ `/products/${ product.image }` }
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



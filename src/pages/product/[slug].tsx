import { GetStaticProps } from 'next'
import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayouts } from "components/layouts";
import { ProductSlideshow, SizeSelextor } from "components/products";
import { ItemCouter } from "components/ui";
import { dbProducts } from "database";

import {  GetStaticPaths } from "next";


import { IProduct, ISizes } from '../../../interfaces/products';
import { useState, useContext } from 'react';
import { CartContext } from '../../../context/cart/CartContext';

//const props = initialData.products[0];

interface Props {
  props:IProduct;
}

const ProductPage = ( props:any) => {
 
 const { addProductCart } =  useContext( CartContext );

  const [ tempCartProduct, setTempCartProduct ]= useState({

    _id:props._id,
    image:props.images[0],
    inStock:props.isStock,
    price:props.price, 
    size:props.size, 
    slug:props.slug,
    title:props.title,
    gender:props.gender, 
    quantity:1,
   });

  
  const selectedSize = (size:ISizes)=>{
    setTempCartProduct( currrentProduct =>({
      ...currrentProduct,
      size
    }) )

  }


  const onUpdatedQuantity = (quantity:number)=>{

      setTempCartProduct( currentProduct =>({
        ...currentProduct,
        quantity
  
    }))
  }

  const onAddProductCart = ()=>{

    if( !tempCartProduct ) return;
    addProductCart(tempCartProduct);

  }
 

  return (
    
    <ShopLayouts title={ props.title } pageDescription={ props.description } >
        <Grid container spacing={ 3 } >
            <Grid item xs={ 12 } sm={ 7 }>
                {/* SlideShow */}
                <ProductSlideshow 
            images={props.images } 
          />
                {/* <ProductSlideshow images={ props.images } /> */}
            </Grid>
            <Grid item xs={ 12 } sm={ 5 } >
                <Box display='flex' flexDirection='column'>
                      {/*titulos*/}

                      <Typography variant='h1' component='h1'>{ props.title }</Typography>
                      <Typography variant='subtitle1' component='h2'>{ `$${props.price}` }</Typography>
                            {/*cantidad  */}
                            <Box sx={{ my:2 }} >
                                <Typography variant='subtitle2' >Cantidad</Typography>

                             <ItemCouter 

                             currentValue = {tempCartProduct.quantity}
                             onUpdatedQuantity = { onUpdatedQuantity}
                             maxValue ={ props.inStock } 
                             />


                             <SizeSelextor 
                             //selectedSize={ props.sizes[1] }
                             sizes={props.sizes}
                             selectedSize={ tempCartProduct.size } 
                            onSelectedSize={ (size) => selectedSize(size) }
                             />
                             </Box>
                             {/* Agregar al carrito  */}
                             {
                              props.inStock > 0 ?( 
                                 <Button sx={{ backgroundColor:'#274494' }}  
                                 color='error' className="circular-btn" 
                                 onClick={ onAddProductCart }
                                 >
                              {

                               tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'
                            
                               }
                           </Button>) :(

                              <Chip label='No hay disponible' color="error" variant="outlined" /> 
                           )
                             }
                           

                             <Box sx={{ mt:3 }} >
                                <Typography variant='subtitle2' >Descripción</Typography>
                                <Typography variant='body2' >{ props.description }</Typography>
                             </Box>
                            </Box>

            </Grid>
        </Grid>
    </ShopLayouts>
  )
} 


// export const getServerSideProps:GetServerSideProps =async({ params })=>{
//   console.log('pase por getProductBySlug')
//   const { slug = '' } = params as { slug: string };
//   console.log({ params })
//   const props = await dbProducts.getProductBySlug( slug );

//   if ( !props ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props:props 
   
//     }
// }


export const  getStaticPaths:GetStaticPaths = async()=> {

  const productSlugs = await dbProducts.getAllproductSlugs();



  return {
    paths: productSlugs.map( obj=>(
      {
        params:{
          slug:obj.slug
        }
      }
    ) ),
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({params}) => {
  const { slug='' } =  params as { slug:string }; 
  
  const props = await dbProducts.getProductBySlug( slug );
  
if( !props ){

  return {
          redirect: {
          destination: '/',
          permanent: false
         }  
  }
}
  return {
    props:props,
    revalidate:60*60*24
  }
}
export default ProductPage;



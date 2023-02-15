import { GetStaticProps } from 'next'
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayouts } from "components/layouts";
import { ProductSlideshow, SizeSelextor } from "components/products";
import { ItemCouter } from "components/ui";
import { dbProducts } from "database";
import { initialData } from "database/products";
import { useProducts } from "hooks";
import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { IProduct } from '../../../interfaces/products';

//const props = initialData.products[0];

interface Props {
  props:IProduct;
}

const ProductPage = ( props:any) => {

  return (
    
    <ShopLayouts title={ props.title } pageDescription={ props.description } >
        <Grid container spacing={ 3 } >
            <Grid item xs={ 12 } sm={ 7 }>
                {/* SlideShow */}
                <ProductSlideshow 
            images={ props.images }
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
                             <ItemCouter />
                             <SizeSelextor 
                             //selectedSize={ props.sizes[1] }
                             sizes={props.sizes}
                             />
                             </Box>
                             {/* Agregar al carrito  */}
                             <Button sx={{ backgroundColor:'#274494' }}  color='error' className="circular-btn" >
                                Agregar al Carrito
                             </Button>

                             {/* <Chip label='No hay disponible' color="error" variant="outlined" /> */}
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


//  const router = useRouter();
//  console.log('la query es '+ router.query.slug)

//  const { products:produtc,isLoading } = useProducts(`/products/${router.query.slug}`);

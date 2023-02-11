import { Grid } from "@mui/material"
import { IProduct } from '../../interfaces/products';
import { ProductCards } from "./ProductCards";


interface Props  {
products:IProduct[];
}

export const ProductList = ({ products }:Props) => {

  const { products:data } =products;

  console.log( data )
  return (
    <Grid container spacing={ 4 } >
        {
           data.map( (product: any) =>(
             <ProductCards 
             key={ product.slug }
             product={ product }
             />
           ) ) 
        }
    </Grid>
  )
}

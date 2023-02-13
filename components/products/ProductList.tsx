import { Grid } from "@mui/material"
import { IProduct } from '../../interfaces/products';
import { ProductCards } from "./ProductCards";


interface Props  {
products:IProduct[];
}

export const ProductList = ({ products }:Props) => {

  


  return (
    <Grid container spacing={ 4 } >
        {
           products.map( (product: any) =>(
             <ProductCards 
             key={ product.slug }
             product={ product }
             />
           ) ) 
        }
    </Grid>
  )
}

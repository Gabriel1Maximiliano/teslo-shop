import  Button from "@mui/material/Button";
import  Box from "@mui/material/Box";
import { FC } from "react";
import { ISizes } from '../../interfaces/products';

interface Props {
    selectedSize?:ISizes;
    sizes: ISizes[];
    onSelectedSize: (arg0: any) => any
}

export const SizeSelextor:FC<Props> = ({ sizes,selectedSize,onSelectedSize }) => {

  return (
    <Box>
        {
            sizes.map( size =>(
                <Button
                key={ size }
                size='small'
               color='info'
                sx={{ backgroundColor:`${ (selectedSize === size) ? 'black':'' }`,
                     color:`${ (selectedSize === size) ? 'white':''}` }}
                onClick={ () =>  onSelectedSize(size)}
                >
                    { size }
                </Button>
            ) )
        }
    </Box>
)} 

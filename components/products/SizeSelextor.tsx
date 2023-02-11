import { Box, Button } from "@mui/material";
import { FC } from "react";
import { ISizes } from '../../interfaces/products';

interface Props {
    selectedSize?:ISizes;
    sizes: ISizes[];
}

export const SizeSelextor:FC<Props> = ({ sizes,selectedSize }) => {
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
                >
                    { size }
                </Button>
            ) )
        }
    </Box>
)} 

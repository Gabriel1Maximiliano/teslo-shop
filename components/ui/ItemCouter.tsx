import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"


interface Props {

  currentValue?:number|any;
  maxValue?:number|'undefined';

  //Methods
  onUpdatedQuantity?: (newValue:number) => void|any


}
export const ItemCouter = ({ currentValue=1,maxValue,onUpdatedQuantity }:Props) => {

  const addOrRemove = (value:number) =>{

    if( value === -1 ){
  if( currentValue === 1){
    return;
  }

  return  onUpdatedQuantity!((currentValue - 1))
    }
    if(currentValue >= maxValue! ){
      return;
    }

    onUpdatedQuantity!(currentValue + 1);

  }
  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={()=>addOrRemove(-1)} >
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={ { width:40, textAlign:'center' } } > {currentValue} </Typography>
        <IconButton onClick={()=>addOrRemove(+1)} >
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}

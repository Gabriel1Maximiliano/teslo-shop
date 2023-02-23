
import { AppBar, Box, Button,  Link, Toolbar, Typography } from "@mui/material"
import NextLink from 'next/link';

import { UIContext } from '../../context/ui/UIContext';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';







export const AdminNavbar = () => {

    const {numberOfItems} = useContext(CartContext);


    const { toggleSideMenu }=useContext( UIContext );


  return (
    <AppBar>
        <Toolbar> 
             <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center' >
                    <Typography variant="h6" >Teslo</Typography>
                    <Typography sx={{ marginLeft:0.5 }}>Shop</Typography>
                </Link>
            </NextLink> 
            {/*todo:flex  */}
                <Box flex={ 1 } />
                
            
                {/* Pantallas grandes */}
          
            

                

            {/* pantallas chicas */}
            

           
            <Button onClick={ toggleSideMenu } >
                Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}

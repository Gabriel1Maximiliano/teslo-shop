import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { UIContext } from '../../context/ui/UIContext';
import { useContext } from 'react';

export const Navbar = () => {

    

    const { toggleSideMenu }=useContext( UIContext );

   const { asPath } = useRouter();

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
                <Box sx={{display:{xs:'none',sm:'block'}}}>
                    <NextLink href='/category/men' passHref legacyBehavior >
                       <Link>
                            <Button sx={{color: (asPath === '/category/men') ? 'blue':''}}>Hombres</Button>
                       </Link> 
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior >
                       <Link>
                            <Button  sx={{color: (asPath === '/category/women') ? 'blue':''}}>Mujeres</Button>
                       </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref  legacyBehavior >
                       <Link>
                            <Button sx={{color: (asPath === '/category/kid') ? 'blue':''}} >Niños</Button>
                       </Link>
                    </NextLink>
                </Box>
                <Box flex={ 1 } />
            <IconButton>
                <SearchOutlined />
            </IconButton>
            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ 2 } color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>
            <Button onClick={ toggleSideMenu } >
                Menú
            </Button>
        </Toolbar>
    </AppBar>
  )
}

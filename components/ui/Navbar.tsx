
import  Typography  from "@mui/material/Typography"
import  Toolbar from "@mui/material/Toolbar"
import  Link from "@mui/material/Link"
import  InputAdornment from "@mui/material/InputAdornment"
import  Input from "@mui/material/Input"
import  IconButton  from "@mui/material/IconButton"
import   Button  from "@mui/material/Button"
import  Box  from "@mui/material/Box"
import   Badge  from "@mui/material/Badge"
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { UIContext } from '../../context/ui/UIContext';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/cart/CartContext';

import  ClearOutlined from "@mui/icons-material/ClearOutlined";
import  SearchOutlined from "@mui/icons-material/SearchOutlined";
import  ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";





export const Navbar = () => {

    const {numberOfItems} = useContext(CartContext);

    const router = useRouter();

    const { asPath } = useRouter();

    const [ searchTerm,setSearchTerm ]=useState('');
    const [ isSearchVisible,setIsSearchVisible ]=useState(false);

    const onSearchTerm =()=>{


        if( searchTerm.trim().length === 0 ){
            return;
        }
    
       
       
        router.push( `/search/${ searchTerm }` );
    }
       

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
                <Box sx={{display:isSearchVisible ? 'none' : {xs:'none',sm:'block'}}}
                className='fadeIn'
                >
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
                            <Button sx={{color: (asPath === '/category/kid') ? 'blue':''}} >Ni??os</Button>
                       </Link>
                    </NextLink>
                </Box>
                <Box flex={ 1 } />
                {/* Pantallas grandes */}
          
            {
                isSearchVisible
                    ? (
                        <Input
                        sx={{display: {xs:'none',sm:'flex'}}}
                        autoFocus
                      value={ searchTerm }
                      onChange={ (e) => setSearchTerm( e.target.value ) }
                      onKeyPress={ (e) => e.code === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={ ()=> setIsSearchVisible(false) }
                                    aria-label="toggle password visibility"
                                    >
                                     <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    : 
                    (
                    <IconButton
                     onClick={ ()=>setIsSearchVisible(true) } 
                     className='fadeIn'
                     sx={{display: {xs:'none',sm:'flex'}}}>
                        <SearchOutlined />
                    </IconButton>
                    ) 
            }

                

            {/* pantallas chicas */}
            <IconButton
            sx={ { display:{xs:'flex',sm:'none'} } }
            onClick={ toggleSideMenu }
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems } color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>
            <Button onClick={ toggleSideMenu } >
                Men??
            </Button>
        </Toolbar>
    </AppBar>
  )
}

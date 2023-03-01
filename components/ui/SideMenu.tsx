
import  Divider from  "@mui/material/Divider"
import ListSubheader  from "@mui/material/ListSubheader"
import  ListItemText  from "@mui/material/ListItemText"
import  ListItemIcon from "@mui/material/ListItemIcon"

import  AdminPanelSettings from "@mui/icons-material/AdminPanelSettings"
import  CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import  VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined"
import  SearchOutlined from "@mui/icons-material/SearchOutlined"
import  MaleOutlined from "@mui/icons-material/MaleOutlined"
import  LoginOutlined from "@mui/icons-material/LoginOutlined"
import  FemaleOutlined from "@mui/icons-material/FemaleOutlined"
import  AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined"

import  EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined"
import  ConfirmationNumberOutlined from "@mui/icons-material/EscalatorWarningOutlined"


import { useContext, useState } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth/AuthContext';
import DashboardOutlined from "@mui/icons-material/DashboardOutlined"
import InputAdornment from "@mui/material/InputAdornment"
import Drawer from "@mui/material/Drawer"
import ListItem from "@mui/material/ListItem"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Input from "@mui/material/Input"
import Box from "@mui/material/Box"



export const SideMenu = () => {

    const { isLoggedIn,user,logout } = useContext( AuthContext );

const router = useRouter();
const { isMenuOpen,toggleSideMenu } =useContext( UIContext );
const [ searchTerm,setSearchTerm ]=useState('');

const onSearchTerm =()=>{


    if( searchTerm.trim().length === 0 ){
        return;
    }

   
    navigateTo(`/search/${ searchTerm }`);
}
const navigateTo = (url:string) =>{
        toggleSideMenu();
        router.push( url );
}


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                    autoFocus
                  value={ searchTerm }
                  onChange={ (e) => setSearchTerm( e.target.value ) }
                  onKeyPress={ (e) => e.code === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ onSearchTerm }
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                        {
                            isLoggedIn && (
                            <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>
            
                            <ListItem button  onClick={()=>navigateTo('/orders/history')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
            
            </>)
                        }
                
                <ListItem button
                 onClick={()=>navigateTo('/category/men')}
                >
                    <ListItemIcon  >
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button 
                onClick={()=>navigateTo('/category/women')} >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button
                 onClick={()=>navigateTo('/category/kid')} >
                
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


               
                {
                    isLoggedIn ? (
                        <ListItem button onClick={()=>logout()} >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>
                    ):( <ListItem button
                    onClick={()=>navigateTo(`/auth/login`)}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>)
                }
               


                {/* Admin */}

                {
                    //(user?.role === 'admin') 
                    true && (
                        <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItem 
                            button
                            onClick={ () => navigateTo('/admin/') }>
                            <ListItemIcon>
                                <DashboardOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItem>

                        <ListItem button
                        onClick={() => navigateTo('/admin/products')}>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem 
                            button
                            onClick={ () => navigateTo('/admin/orders') }>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem 
                            button
                            onClick={ () => navigateTo('/admin/users') }>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>                        
                    </>
          )
                }
               
            </List>
        </Box>
    </Drawer>
  )
}

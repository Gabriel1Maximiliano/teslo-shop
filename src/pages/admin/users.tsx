import PeopleOutline  from '@mui/icons-material/PeopleOutline'
import { AdminLayout } from 'components/layouts'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { IUser } from '../../../interfaces/user';
import useSWR from "swr"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { tesloApi } from 'api';

const UsersPage = () => {

    const { data, error } = useSWR<IUser | any>('/api/admin/users');

    const [ users, setUsers ] = useState<IUser[]>([]);
    
    useEffect(() => {
        if (data) {
            setUsers(data);
        }
      }, [data])
      
    if( !data && !error ){
        return <></>
    }
const onRoleUpdated = async( userId:string, newRole:string )=>{
    const id = userId;
    const previosUsers = users.map( user => ({ ...user }));
   const updatedUsers = users.map( user=>({
    ...user,
    role: (id === user._id ? newRole : user.role)
   }) )
setUsers(updatedUsers);
 try{

const { data } = await tesloApi.put('/admin/users',{userId,role:newRole});
 console.log(data)
 }catch(error){
    setUsers(previosUsers);
  alert('No se pudo actualizar el usuario');
  console.log(error);
 }}
    const columns : GridColDef[] = [
        {field:'email', headerName:'Correo', width:250},
        {field:'name', headerName:'Nombre Completo', width:300},
       
        {
            field:'role',
            headerName:'Rol',
            width:300,
            renderCell: ( { row })=>{
                return (
                    <Select
                    value ={ row.role }
                    onChange={ ({ target })=>onRoleUpdated(row.id,target.value) }
                    sx={{ width:'300px' }}

                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                        <MenuItem value='super-user'> Super User </MenuItem>
                        <MenuItem value='SEO'> SEO </MenuItem>

                    </Select>
                )
            }
        }
    ];

    const rows = users.map(( user:any) =>({
        id:user._id,
        email:user.email,
        name:user.name,
        role:user.role

    }) )

    

    
  return (
   <AdminLayout title={'Usuarios'} subtitle={'Mantenimiento de usuarios'} icon={ <PeopleOutline /> }>
   <Grid container className='fadeIn' >
             <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
               
                    rows={ rows}
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid> 
        </Grid> 
   </AdminLayout>
  )
}

export default UsersPage



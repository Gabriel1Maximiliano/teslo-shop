import NextLink from 'next/link';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


import useSWR from 'swr';
import Grid from '@mui/material/Grid';
import React from 'react';
import { IProduct } from '../../../interfaces/products';
import  CategoryOutlined  from '@mui/icons-material/CategoryOutlined';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import  AddOutlined  from '@mui/icons-material/AddOutlined';


const columns:GridColDef[] = [
    
   
    { 
      field: 'img', 
      headerName: 'Foto', 
      renderCell:({ row })=>{
        return (
          <a href={`/product/${ row.slug }`} target='_blank' rel='noreferrer'>
            <CardMedia 
            component='img'
            className='fadeIn'
            alt={`${ row.title }`}// image={`/products/${ row.img }`}
            //image={`/products/${ row.img }`}
            image={ row.img }
            />
          </a>
        )
      }
    },
    { 
      field: 'title',
       headerName: 'Title',
        width: 250,
        renderCell: ( { row } ) => {
          return(
            <NextLink href={`/admin/products/${ row.slug }`} passHref legacyBehavior>
              <Link
              underline='always'
              >
              { row.title }
              </Link>
            </NextLink>
          ) 
        }
       },
    { field: 'gender', headerName: 'Género'},
    { field: 'type', headerName: 'Tipo'},
    { field: 'inStock', headerName: 'Inventario'},
    { field: 'price', headerName: 'Precio'},
    { field: 'sizes', headerName: 'Tallas',width:250},
    

];


const ProductsPage = () => {



    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if ( !data && !error ) return (<></>);
   
    const rows = data!.map( product => ({
      id:product._id,
      img:product.images[0],
      title:product.title, 
      gender :product.gender,
      type :product.type,
      inStock:product.inStock, 
      price:product.price, 
      sizes:product.sizes.join(', '),
      slug:product.slug,
    }));

  return (
    <AdminLayout 
    title={`Productos (${ data?.length } )`} 
    subtitle={'Mantenimiento de productos'} 
    icon={<CategoryOutlined />} 
    >
      <Box display='flex' justifyContent='end' sx={{ mb:2  }} >
        <Button 
        startIcon={ <AddOutlined /> }
        color='secondary'
        href='/admin/products/new'
        sx={{backgroundColor:'#274494'}}
        >
          Crear Producto
        </Button>
      </Box>
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default ProductsPage
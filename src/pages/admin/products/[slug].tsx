
import { GetServerSideProps } from 'next'

import { DriveFileRenameOutline, FlashOnOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { AdminLayout } from 'components/layouts';
import { dbProducts } from 'database';
import { IProduct, ITypes } from 'interfaces';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { tesloApi } from 'api';
import { Product } from 'models';
import { useRouter } from 'next/router';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

interface FormData {
    _id?       :string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : any;
    slug       : string;
    tags       : string[];
    title      : string;
    type       : any;
    gender     : 'men'|'women'|'kid'|'unisex'|string;
} 


interface Props {
    product: IProduct;
}

const ProductAdminPage = ({ product }:Props) => {
  
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement | null | any>();

    const [ newTagValue, setnewTagValue ] = useState('');

    const [ isSaving, setIsSaving ] = useState(false);

    const { register,handleSubmit,formState:{ errors },getValues,setValue,watch } = useForm({
        defaultValues:product,
    });

const onDeleteImage =(image:string)=>{
    setValue('images',getValues('images').filter(img=> img !== image),{shouldValidate:true})
}    
const onFileSelected =async({ target }:any)=>{
    if( !target.files || target.files.length === 0 ){
    return;
    }


    try {
    //console.log(file)
    for (const file of target.files) {
        const formData = new FormData();
        formData.append('file',file);

        const {data} = await tesloApi.post('/admin/upload',formData);
        console.log( data.message )
        setValue('images',[...getValues('images'), data.message],{shouldValidate:true})
    }
} catch (error) {
    
}
console.log(target.files)
}
const onNewTag =()=>{
   const newTag = newTagValue.trim().toLowerCase();

   setnewTagValue('');
   const currentTags = getValues('tags');

   if( currentTags.includes(newTag) ){
        return;
   }

   currentTags.push(newTag);
    }

const onDeleteTag = ( tag: string ) => {
     const updatedTags = getValues('tags').filter(t => t !== tag);
     
     setValue('tags',updatedTags, { shouldValidate:true })
}

useEffect(() => {

const suscription = watch(( value,{name,type} )=>{// ojo esto genera un observable use clean function

if( name === 'title' ){
 const newSuggestedSlug = value.title?.trim()
                                      .replaceAll(' ', '_')
                                      .replaceAll("'", '')
                                      .toLocaleLowerCase() || '';

                                      setValue('slug',newSuggestedSlug);
}
})
    
      return ()=>suscription.unsubscribe();
}, [watch,setValue])
    

const onSubmitForm = async(form:FormData)=>{
  console.log({form})
  if( form.images.length < 2 ){
    return alert('Mínimo 2 imágenes');
} 

setIsSaving(true);

try{
 const { data } = await tesloApi({
    url:'/admin/products',
    method:form._id ?'PUT' : 'POST',
    data: form
 });
 console.log({data})

 if( !form._id ){
 //TODO recargar navegador
 router.replace(`/admin/products/${ form.slug }`);
 }else{
    setIsSaving(false);
 }
}catch(error){
console.log(error);
setIsSaving(false);
}

    
}
const onChangeSize = ( size:string )=>{

const currentSizes= getValues( 'sizes' );
  
if( currentSizes.includes( size ) ){
 return setValue('sizes',currentSizes.filter( s=> s !== size ) ,{shouldValidate:true});

}

setValue('sizes',[...currentSizes,size],{shouldValidate:true})
}
    return (
        <AdminLayout 
            title={'Producto'} 
            subtitle={`Editando: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit(onSubmitForm)} >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }  
                        sx={{ width: '150px',backgroundColor:'#274494'  }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido',
                                
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min:{value:0,message:'Mínimo valor cero'}
                                
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min:{value:0,message:'Mínimo valor cero'}
                                
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                 onChange={ ({target} )=>setValue('type',target.value,{shouldValidate:true}) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({target} )=>setValue('gender',target.value,{shouldValidate:true})}
                                // value={ status }
                                // onChange={ onStatusChanged }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    {/* <FormGroup> */}
                            <FormLabel>Tallas</FormLabel>
                          
                            {
                                validSizes.map((size,index) => (
                                    <FormControlLabel 
                                    key={size} 
                                    control={<Checkbox checked={getValues('sizes').includes(size)}/>} 
                                    label={ size } 
                                    onChange={ () => onChangeSize( size ) }
                                    />
                                ))
                            }
                        {/* </FormGroup> */}

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }} 
                             { ...register('slug', {
                                required: 'Este campo es requerido',
                               validate: (val)=> val.trim().includes(' ') ? 'No puede tener espacios vacíos':undefined 
                                
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"

                            value={ newTagValue }
                            onChange={({ target })=> setnewTagValue( target.value )}
                            onKeyUp={({code}) => code === 'Space' ? onNewTag(): undefined}
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                 getValues('tags').map((tag:any) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color='error'
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3,backgroundColor:'#274494'  }}
                                onClick={ ()=>fileInputRef.current?.click()  }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                            ref={ fileInputRef   }
                            type='file'
                            multiple
                            accept='image/png, image/gif, image/jpeg'
                            style={{display:'none'}}
                            onChange={ onFileSelected }
                            />

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ mb: 1 }}
                            />

                            <Grid container spacing={2} >
                                {
                                    getValues('images').map( (img:any) => (
                                        <Grid item xs={4} sm={3} key={img} >
                                            <Card >
                                                <CardMedia  
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/products/${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                    fullWidth color="error" 
                                                    sx={{backgroundColor:'#d32f2f'}}
                                                    onClick={ ()=>onDeleteImage(img) }
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;

    let product :IProduct | null;

    if( slug === 'new' ){
  const temporalProduct = JSON.parse( JSON.stringify( new Product() ) )

  delete temporalProduct._id;
  temporalProduct.images = [ 'img1.jpg','img2.jpg' ];
  product = temporalProduct;
    }else{
        product =await dbProducts.getProductBySlug(slug.toString());

    }
    
    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage
import { db } from 'database';
import { Product } from 'models';
import type {  NextApiRequest, NextApiResponse } from 'next'


type Data = 
|{message: string}
|any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':

        return getProductBySlug( req, res );
            
        default:
          return  res.status(404).json({ message: 'Product not found' })  ;
    }

   
}

const  getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
   
    const { slug } = req.query;

    await db.connect(); 
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ){
        return res.status(404).json( {message:'Product not found'} );
    }
    //TODO acomodar img recordar dejar asi si sacas las var de entorno '/products/${ image }'
    //background-image:url(/https://res.cloudinary.com/dkgtcfce7/image/upload/v1677431351/n0lo04g1xmlgxldshxym.jpg);
   //http//localhost:3000/products/8529107-00-A_0_2000.jpg
 
   product.images = product.images.map( image => {
    return image.includes('http') ? image : `${image}`
});
console.log(product)
   return res.status(200).json( product );
    
}


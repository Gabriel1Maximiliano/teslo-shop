import { db } from 'database';
import { Product } from 'models';
import type {  NextApiRequest, NextApiResponse } from 'next'


type Data = 
|{message: string}
|any

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

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

   return res.status(200).json( product );
    
}


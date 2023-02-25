import { isValidObjectId } from 'mongoose';
import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../../interfaces/products';

type Data = 
|IProduct[]
|{ message: string}
|IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'GET':
            
           return getProducts( req,res )
            case 'PUT':

            return updateProducts( req, res )   
            
            
            case 'POST':
            return createProduct( req, res )
            break;
        default:
           return res.status(400).json({ message: 'Example' })
    }
    
    
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();

    const products = await Product.find()
    .sort({title:'asc'})
    .lean();
    await db.disconnect();
    //todo actualizar paginas 

    return res.status(200).json( products )
}
async function updateProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { _id='',images=[] } = req.body as IProduct ;

    if( !isValidObjectId( _id ) ){
        return res.status(400).json( {message:'The product id is not valid'} )
    }

    if( images.length < 2 ){
        return res.status(400).json( {message:'At least 2 images please'} )
    }

    //TODO posiblemente tendre un localhost:3000/produts/asadsad/jpg
try {
    await db.connect();

    const product = await Product.findById( _id );

    if( !product ){
        await db.disconnect();
        return res.status(400).json( {message:'There is no product width this Id'} )
    }

    //TODO elimimar images Cloudinary

    await product.updateOne( req.body );

    await db.disconnect();

    return res.status(200).json( product );
} catch (error) {
    console.log(error)
    await db.disconnect();
    return res.status(400).json( {message:'Check the console service'} )
}

    
    
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { images=[] } = req.body as IProduct;
    

    if( images.length < 2  ){
        return res.status(200).json({ message: 'To create a product at least 2 images' });
    }

    
    //TODO posiblemente tendre un localhost:3000/produts/asadsad/jpg

    try{

        await db.connect();
        const productInDataBase = await Product.findOne({ slug:req.body.slug });
        if( productInDataBase ){
            await db.disconnect();
            return res.status(400).json({ message: 'This slug product already exists' });
        }

        const product =  new Product( req.body );

        product.save();

        await db.disconnect();

        return res.status(201).json( product );

    }catch(error){
        await db.disconnect();
  console.log(error);
  return res.status(200).json({ message: 'To create a product at least 2 images' });

    }
    return res.status(200).json({ message: 'Check logs server' })
}


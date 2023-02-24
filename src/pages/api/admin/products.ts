import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../../interfaces/products';

type Data = 
|IProduct[]
|{ message: string}

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
function updateProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    return res.status(200).json({ message: 'soy un updateProducts' })
}

function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    return res.status(200).json({ message: 'soy un createProduct' })
}


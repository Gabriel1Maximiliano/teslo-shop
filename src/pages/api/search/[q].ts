import { db } from 'database';
import { Product } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next'

import { IProduct } from '../../../../interfaces/products';

type Data = 
|{message: string}
|IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            
           return getSearchProducts( req,res )
    
        default:
            return res.status(200).json({ message: 'Soy el end poit de query' })
    }
    
}

const getSearchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{
    let { q='' }= req.query;
    
    if( q.length === 0 ){
       return res.status(200).json({ message:'sin query' })
    }

    q = q.toString().toLowerCase();

    await db.connect();

    const products = await Product.find({
        $text:{$search:q }
    }).lean();


    await db.disconnect();

    return res.status(200).json(products)
}

import { db } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../models';
import  { initialData } from '../../../database';

type Data = {
    message: string
}

export default  async function (req: NextApiRequest, res: NextApiResponse<Data>) {


    if( process.env.NODE_ENV === 'production' ){

        return res.status(401).json({ message:'Access denied to this API' });
    }

    await db.connect();

    await Product.deleteMany();
    await Product.insertMany( initialData.products );
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado ok' })
}
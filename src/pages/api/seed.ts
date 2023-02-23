import { db } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../models';
import  { seedDatabase } from '../../../database';
import User from 'models/User';
import Order from 'models/Order';

type Data = {
    message: string
}

export default  async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    if( process.env.NODE_ENV === 'production' ){

        return res.status(401).json({ message:'Access denied to this API' });
    }

    await db.connect();
    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await Product.deleteMany();
    await Product.insertMany( seedDatabase.initialData.products );

    await Order.deleteMany();
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado ok' })
}
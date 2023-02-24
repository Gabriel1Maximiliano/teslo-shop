import { db } from 'database'
import { IOrder } from 'interfaces'
import Order from 'models/Order'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
|{ message: string}
|IOrder[]

export default function handleOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
    switch( req.method ){
        case 'GET':
 
        return getOrders(req, res)
       
        default:
 
          return  res.status(400).json({ message: 'Bad request' })
     }
 
}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
   await db.connect();
   const orders = await Order.find()
   .populate('user','name email')
   .sort({createdAt:'desc'})
   .lean();

   await db.disconnect();

   return res.status(200).json( orders )
}

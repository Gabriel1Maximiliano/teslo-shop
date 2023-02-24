import axios from 'axios'
import { db } from 'database'
import { IPayPal } from 'interfaces'
import Order from 'models/Order'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            
        return payOrder(req,res) 
    
        default:
          return  res.status(500).json({ message: 'Error in PayOrder' })
    }
    
    
}

const getPaypalBearerToken = async ():Promise<string|null|undefined>=>{

    const PAYPAL_CLIENT_ID =process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT_ID }:${ PAYPAL_SECRET }`,'utf-8').toString('base64');
  console.log({base64Token})
    const body = new URLSearchParams('grant_type=client_credentials');
    console.log({body})

    try{

        const { data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;
        
    }catch(error){
        if( axios.isAxiosError(error) ){
            console.log(error.response?.data)
        }
        console.log(error)
    }


}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {


    const paypalBearerToken = await getPaypalBearerToken();



    if( !paypalBearerToken ){
        return  res.status(400).json({ message:'no se pudo generar el paypal token' })
    }

    const { transactionId='', orderId='' } = req.body;
  

    const { data } = await axios.get<IPayPal.PayPalOrderStatusResponse>(`${ process.env.PAYPAL_ORDERS_URL }/${ transactionId }`,{
        headers:{
            'Authorization': `Bearer ${ paypalBearerToken }`
        
        }
    });

    if( data.status !== 'COMPLETED' ){
        return  res.status(401).json({ message:'Unrecognized payment order'})
    }

    await db.connect();

    const dbOrder = await Order.findById( orderId );

    if( !dbOrder ){
        await db.connect();
        return  res.status(400).json({ message:'Order does not exist in our database' })
    }

    if( dbOrder.total !== Number(data.purchase_units[0].amount.value) ){
        await db.connect();
        return  res.status(200).json({ message:'The amounts of PayPal and our order are not the same' });
    }
    
    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();
    await db.disconnect();

    
    return res.status(200).json({ message: 'Paid order' });
}

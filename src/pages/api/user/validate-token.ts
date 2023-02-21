import { db } from 'database';
import User from 'models/User';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { jwt } from 'utils';

type Data =
|{ message: string}
|{token:string;
user:{
    email:string;
    name:string;
    role:string;
}}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
   switch (req.method) {
    case 'GET':

    return checkJwt( req, res )
    default:
       return  res.status(200).json({ message: 'Bad request in Login' })
   }
   
   
}

const  checkJwt = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    const { token='' } = req.cookies;

    
  let userId =''
  try {
    userId = await jwt.isValidToken(token.toString());
    console.log({userId})
  } catch (error) {
    return res.status(401).json({message:'Token invalid'})
  }
    await db.connect();
  const user = await User.findById(userId).lean();
    await db.disconnect();

    if(!user){

        return res.status(404).json({message:'there is no user with that id'})

    }
    const { _id,email,role,name } = user;

    return res.status(200).json({
        token:jwt.signToken(_id,email),
        user:{
            email,
            role,
            name,
        }
    })
}

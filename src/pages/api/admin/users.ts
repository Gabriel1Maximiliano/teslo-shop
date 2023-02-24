import { db } from 'database'
import User from 'models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '../../../../interfaces/user';
import { isValidObjectId } from 'mongoose';

type Data = |{message:string}| IUser[]


export default function handleUsers(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){
       case 'GET':

       return getUsers(req, res)
       case 'PUT':

       return updateUsers(req, res)
       default:

         return  res.status(400).json({ message: 'Bad request' })
    }


}

const  getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    await db.connect();

    const users = await User.find().select('-password').lean();
    await db.disconnect();
    
   return  res.status(200).json( users );
}
const  updateUsers = async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
   
     const { userId='',role='' } = req.body;
     

    if( !isValidObjectId( userId ) ){
        return  res.status(400).json({ message: 'Bad request invalid user Id' });
    }

    const validRoles = ['admin','client','SEO','super-user'];
    
    if( !validRoles.includes( role ) ){
        return  res.status(400).json({ message: 'Invalid role '+ validRoles.join(',') });
    }
    

    await db.connect();

    const user = await User.findById( userId );
    
    await db.disconnect();

    if( !user ){
        await db.disconnect();
        return res.status(400).json({ message: 'User not found' })
    }

    user.role = role;
    await user.save();
    await db.disconnect();

    return res.status(200).json({ message: 'User updated' })
}


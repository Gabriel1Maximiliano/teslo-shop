import { db } from 'database'
import User from 'models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt, validations } from 'utils';
import bcrypt from 'bcryptjs';
import { isEmail } from '../../../../utils/validations';

type Data =
|{ message: string}
|{token:string;
user:{
    email:string;
    name:string;
    role:string;
}}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>){
  
  switch (req.method) {
    case 'POST':
        return  registerUser( req, res )
  
    default:
        return  res.status(404).json({ message: 'User do not exist' })
  }
  
   
}

const registerUser=async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
    const { email ='', password ='', name=''} = req.body as {email:string,password:string,name:string} ;
   
    if( password.length < 6 ){
return res.status(400).json({message:'Password with at least 6 characters'})
    }
    if(name.length < 2 ){
        return res.status(400).json({message:'Name with at least 3 characters'})
    }
    // validar email

    if( !validations.isEmail( email ) ){
        return res.status(400).json({message:'Invalid email'})
    }
    await db.connect();
    
    const user = await User.findOne({email})
    if( user ){
        return res.status(400).json({message:'User already exists'})
    }
   
    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password:bcrypt.hashSync(password),
        role:'client',
        name,
    });


    try {
        await newUser.save({validateBeforeSave:true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Check logs from server'})
    }

   

    const { _id,role } = newUser;

    const token = jwt.signToken(_id,email);

    return res.status(200).json({ token,user:{email,name,role}})

}

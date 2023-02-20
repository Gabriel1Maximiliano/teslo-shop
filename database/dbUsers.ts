import { db } from 'database';
import User from 'models/User';
import bcrypt from 'bcryptjs';

export const checkUSerEmailPassword =async( email:string,password:string )=>{

await db.connect();

const user = await User.findOne({ email });
    
await db.disconnect();

if( !user ){
return null;
}

if( !bcrypt.compareSync(password,user.password!) ){
return null;
}

const { role,name,_id }=user;

return {
    _id,
    email:email.toLowerCase(),
    role,
    name
}
}

// this function validate or create an user from OAuth

export const oAUthToDbUser =async(oAuhtEmail:string,oAuthName:string)=>{
    

    await db.connect();

    const user = await User.findOne({email:oAuhtEmail});
  

    if(user){
        await db.disconnect();
        const  { _id, name,email,role } = user;
        return { _id, name,email,role };
    }

    const newUser = new User({email:oAuhtEmail, name:oAuthName,password:'@',role:'client'});
     
    await newUser.save();
    await db.disconnect();


 const  { _id, name,email,role } = newUser;

 return { _id, name,email,role };




}
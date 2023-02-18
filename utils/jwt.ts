import jwt from 'jsonwebtoken'

export const signToken = (_id:string, email:string)=>{
if( !process.env.JWT_SECRET_SEED ){

    throw new Error('There is not a seed of jwt check your environment variables')
}
 return jwt.sign(
 //payload 
 {_id,email},
//seed
process.env.JWT_SECRET_SEED,
//options
{ expiresIn:'30d' }
 
)
}
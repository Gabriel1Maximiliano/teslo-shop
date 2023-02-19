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


export const isValidToken = ( token:string ):Promise<string>=>{
    if( !process.env.JWT_SECRET_SEED ){

        throw new Error('There is not a seed of jwt check your environment variables')
    }
    if( token.length <= 10 ){
         return Promise.reject('JWT invalid');
    }

    return new Promise( (resolve,reject)=>{
        try {
            jwt.verify( token,process.env.JWT_SECRET_SEED || '',(err,payload)=>{
                if(err){
                    return reject('Invalid jwt')
                }

                const {_id} = payload as {_id:string}

                resolve(_id)
            } )
        } catch (error) {
            reject('Invalid jwt')
        }
    } )
}
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';


import {v2 as cloudinary} from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL || '');

type Data = {
    message: string
}
export const config ={
    api:{
        bodyParser:false
    }
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile( req, res )
            
    
        default:
           return res.status(400).json({ message: 'Bad request' })
    }
    
    

}

const saveFile = async(file:any)=>{

// const data = fs.readFileSync( file.filepath ); 

// fs.writeFileSync(`./public/${ file.originalFileName }`,data);

// fs.unlinkSync( file.filepath );
// return;

const { secure_url } = await cloudinary.uploader.upload( file.filepath );

return secure_url; 
}

const parseFile = async(req:any)=>{

 return new Promise((resolve,reject)=>{

    const form = new formidable.IncomingForm();
    form.parse( req,async(err: any,fields: any,files: any) =>{
        //console.log({err,fields,files});

        if( err ){
            return reject(err);
        }
       const filePath = await  saveFile( files.file as formidable.File )
        resolve(filePath)
    })
 })
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
    
   const imageUrl:any =  await parseFile(req);

     return res.status(200).json({ message:imageUrl })
}

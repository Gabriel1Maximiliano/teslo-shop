import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

interface ProductSlug {
    slug: string;
}

export const getProductBySlug = async( slug: string ): Promise<IProduct | null> => {
    

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
   
    await db.disconnect();

    if ( !product ) {
        return null;
    }

    //TODO
    // procesamiento de las imágenes cuando las suba al server
    
    return  JSON.parse( JSON.stringify( product ) );
}

export const getAllproductSlugs = async():Promise<ProductSlug[]>=>{

    await db.connect();


    const slugs = await Product.find().select('slug -_id').lean();


   
    await db.disconnect();

    return slugs;


}

export const getProductsByTerm = async( term:string ):Promise<IProduct[] | string > =>{

    term = term.toString().toLocaleLowerCase();
    
    await db.connect();
    
    const products = await Product.find({$text:{ $search :term } })
                                  .select('title images price inStock slug -_id')
                                  .lean();
    await db.disconnect();
    
    return products;
}

export const getAllProducts = async(): Promise<IProduct[]> => {

    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();


    return JSON.parse( JSON.stringify( products ) );
}
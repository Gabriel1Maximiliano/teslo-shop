import { IProduct } from 'interfaces';
import mongoose , { Schema,model,Model } from 'mongoose';
/**
 * description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
 */

const productSchema = new Schema({
    description:{type:String, required:true},
    image:[{ type:String }],
    inStock:{type:Number, required:true, default: 0},
    price:{type:Number, required:true, default:0},
    sizes:[{
        type: String,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message:'{VALUE} no es un tamaño permitido'
        }
    }],
    slug:{ type:String, required:true,unique:true },
    tags:[{type:String}],
    title:{ type:String },
    type:{
        enum:['shirts','pants','hoodies','hats'],
        message:'{VALUE} no es un tipo permitido'
    },
    gender:{
        type:String,
        enum:{
            values:['men','women','kid','unisex'],
            message:'{VALUE} no es un género válido'
        }
    }
},{

    timestamps:true
})

        // TODO     crear inidce
const Product :Model<IProduct> = mongoose.models.Product || model('Product',productSchema);

export default Product;
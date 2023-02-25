import { IProduct } from 'interfaces';
import mongoose , { Schema,model,Model } from 'mongoose';


const productSchema = new Schema({
    
    description:{type:String, required:true,default:'' },
    images     :[{ type:String }],
    inStock    :{type:Number, required:true, default: 0},
    price      :{type:Number, required:true, default:0},
    sizes      :[{
        type: String,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} is not a size supported' 
        }
    }],
    slug      :{ type:String, required:true,unique:true },
    tags      :[{type:String}],
    title     :{ type:String,required:true,default:'' },
    type      : {
        type: String,
        enum: {
            values: ['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tipo válido'
        },
        default:'shirts'
    },
    gender  :{
        type:String,
        enum:{
            values:['men','women','kid','unisex'],
            message: '{VALUE} is not a valid genre' 
        },
        default:'women'
    }
},{

    timestamps:true
})

        // TODO     crear inidce
productSchema.index({ title:'text',tags:'text' });

const Product :Model<IProduct> = mongoose.models?.Product || model('Product',productSchema);

export default Product;
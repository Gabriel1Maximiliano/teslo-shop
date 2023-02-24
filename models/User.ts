import { IUser } from 'interfaces/user';
import mongoose , {Schema,model,Model} from'mongoose' ;



const userSchema = new Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String,required: true },
    role:{
        type:String,
        enum:{
            values:['admin','client','SEO','super-user'],
            message:'{VALUE} invalid role',
            defaul:'client',
            required:true

        }
    }
},{
    timestamps:true
})

const User:Model<IUser>=  mongoose.models.User || model('User',userSchema);

export default User;
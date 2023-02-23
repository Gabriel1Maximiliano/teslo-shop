import { db } from "database";
import { IOrder } from "interfaces";
import Order from "models/Order";
import { isValidObjectId } from "mongoose";


export const getOrderById =async (id:string):Promise<any>=>{

    if( !isValidObjectId(id) ){
      return null;
    }

    await db.connect();

    const order = await Order.findById(id).lean();

    await db.disconnect();

    if( !order ){
        return null;
    }

    return JSON.parse(JSON.stringify( order ));

}

export const getOrdersByUser = async (userId:string):Promise<IOrder | []> =>{

if( !isValidObjectId(userId) ){
  return [];
}

await db.connect();

const orders = await Order.find({ user: userId }).lean();

await db.disconnect();
console.log(JSON.parse( JSON.stringify( orders ) ))

return JSON.parse( JSON.stringify( orders ) );



}
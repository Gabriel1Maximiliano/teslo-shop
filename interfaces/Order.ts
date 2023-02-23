import { ISizes } from './products';
import { IUser } from './user';



export interface IOrder {

    _id?           :string;
    user?          :IUser | string;
    orderItems     :IOrderItem[] | any;
    shippingAddress:ShippingAddress;
    paymentResult  :string;

    numberOfItems  :number;
    subTotal       :number;
    tax            :number;
    total          :number;

    isPaid         :boolean;
    paidAt         :string;
}

export interface IOrderItem{

    _id     :string;
    title   :string;
    size    :ISizes | any;
    quantity:string;
    slug    :string;
    image   :string;
    price   :number;
    gender  :string;
}

export interface ShippingAddress {

    firstName :string;
    lastName  :string;
    address   :string;
    address2? :string;
    zip       :string;
    city      :string;
    country   :string;
    phone     :string;
    
  }
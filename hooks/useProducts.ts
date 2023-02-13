import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from '../interfaces/products';





export const useProducts = ( url:string,config :SWRConfiguration = { } ) =>{

    //const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json());
    const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json());

    const { data, error, isLoading } = useSWR<IProduct[]>(`/api/${ url }`, fetcher);


    return {
        products:data || [],
        isLoading: ! error && ! data,
        isError: error,
    }
  
}
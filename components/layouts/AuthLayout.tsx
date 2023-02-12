import { Box } from "@mui/material";
import Head from "next/head";

interface Props  {
    title:String;
    children:any;
}

export const AuthLayout = ({ children,title }:Props) => {
  return (
    <>
    <Head>
        <title>{ title }</title>
    </Head>
    
    <main  >
        <Box>
            { children }
        </Box>
    </main>
    </>
  )
}

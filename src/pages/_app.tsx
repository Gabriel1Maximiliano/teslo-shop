import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider  } from 'context';
import { CartProvider } from 'context/cart';
import { UIProvider } from 'context/ui';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { lightTheme } from '../../themes/light-theme';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function App({ Component, pageProps }: AppProps) {
  console.log( 'variable desde App'+process.env.NEXT_AUHT_PAYPAL_CLIENT_ID)
  return (
<SessionProvider>
  <PayPalScriptProvider options={{ "client-id": 'ARST-UyBmH4ArupBqPasgRjfxkpNo2VFg8RG4X2z3ugsGJqE5q7ONYBo6Fy-jsQOt5WD6XUj1a3LeuQE' || '' }} >
    <SWRConfig 
    value={{
      
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
      <AuthProvider>
        <CartProvider>
            <UIProvider>
              <ThemeProvider theme={ lightTheme } >
                  <CssBaseline />
                  <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>  
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  </PayPalScriptProvider>
    </SessionProvider>    
  )
}

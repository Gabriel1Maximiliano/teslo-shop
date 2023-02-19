import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider  } from 'context';
import { CartProvider } from 'context/cart';
import { UIProvider } from 'context/ui';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { lightTheme } from '../../themes/light-theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
<SessionProvider>
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
    </SessionProvider>    
  )
}

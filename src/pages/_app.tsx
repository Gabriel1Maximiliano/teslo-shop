import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { UIProvider } from 'context';
import { CartProvider } from 'context/cart';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { lightTheme } from '../../themes/light-theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
    value={{
      
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <CartProvider>
    <UIProvider>
    <ThemeProvider theme={ lightTheme } >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    </UIProvider>  
    </CartProvider>
    </SWRConfig>
  )
}

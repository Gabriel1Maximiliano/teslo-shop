import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
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
    <ThemeProvider theme={ lightTheme } >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    </SWRConfig>  
  )
}

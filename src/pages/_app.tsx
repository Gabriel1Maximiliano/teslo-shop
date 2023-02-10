import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { lightTheme } from '../../themes/light-theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ lightTheme } >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

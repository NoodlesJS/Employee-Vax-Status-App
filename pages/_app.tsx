import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SpeechProvider } from "@speechly/react-client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SpeechProvider apiUrl='wss://api-us-west1.speechly.com/ws/v1' loginUrl='https://api-us-west1.speechly.com/login' appId="54f6bb53-759c-4144-af87-f0ac2f60b5bd" language="en-US">
      <Component {...pageProps} />
    </SpeechProvider>
  )
}

export default MyApp

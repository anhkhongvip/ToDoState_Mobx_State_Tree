import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider, rootStore } from "../src/models/Root";
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={rootStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

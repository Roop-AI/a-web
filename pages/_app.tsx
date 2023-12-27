import { Provider } from "react-redux";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { store } from "@/redux/slices/store";
import NavigationLoader from "@/components/navigationLoader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationLoader />
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

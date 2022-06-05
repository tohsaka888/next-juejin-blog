import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import Header from "components/Header";
import LoginModal from '../components/LoginModal/index';

function MyApp({ Component, pageProps }: AppProps) {
  const props = useDisclosure()
  return (
    <ChakraProvider>
      <Header onOpen={props.onOpen} />
      <LoginModal {...props} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

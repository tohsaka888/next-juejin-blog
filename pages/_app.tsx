import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import Header from "components/Header";
import { H1, H2, H3, H4, H5, H6 } from "markdown/Heading";
import "../styles/prism-theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MDXProvider
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
        }}
      >
        <Header />
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;

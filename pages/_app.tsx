import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import Header from "components/Header";
import LoginModal from '../components/LoginModal/index';
import { LoginStatusContext } from "context/Context";
import { useEffect, useState } from "react";
import { LoginStatus, LoginStatusResponse } from "config/type";
import { baseUrl } from "config/baseUrl";

function MyApp({ Component, pageProps }: AppProps) {
  const props = useDisclosure()
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    status: false,
    username: "",
    userId: ''
  });

  useEffect(() => {
    const getLoginStatus = async () => {
      const res = await fetch(`${baseUrl}/api/login/status`, {
        method: "POST",
        body: JSON.stringify({
          token: localStorage.getItem("token") || "",
        })
      });
      const data: LoginStatusResponse = await res.json();
      setLoginStatus({
        status: data.success,
        username: data.data.username,
        userId: data.data.userId
      });
    }
    if (localStorage.getItem("token")) {
      getLoginStatus();
    } else {
      setLoginStatus({
        status: false,
        username: "",
        userId: ''
      });
    }
  }, [])

  return (
    <ChakraProvider>
      <LoginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Header onOpen={props.onOpen} />
        <LoginModal {...props} />
        <Component {...pageProps} />
      </LoginStatusContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;

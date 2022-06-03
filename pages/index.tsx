import { Flex, useColorMode } from "@chakra-ui/react";
import { baseUrl } from "config/baseUrl";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Content from "../components/Content";
import Sider from "../components/Sider";
import { shadows } from "../config/theme";
import styles from "../styles/Home.module.css";
import { ListResponse, ArticleBriefInfo } from "../config/type";
import { ListContext } from "context/Context";
import DailySign from "../components/DailySign/index";

const Home: NextPage<{ list: ArticleBriefInfo[] }> = ({ list }) => {
  const { colorMode } = useColorMode();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          width={"100%"}
          height={"100%"}
          bg={colorMode === "light" ? "#f9f9f9" : undefined}
          padding={"16px 18vw"}
          mt={"60px"}
        >
          <ListContext.Provider value={list}>
            <Content />
          </ListContext.Provider>
          <Sider>
            <DailySign />
          </Sider>
        </Flex>
      </main>

      <footer
        className={styles.footer}
        style={{ boxShadow: shadows[colorMode] }}
      >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${baseUrl}/api/list`);
  const data: ListResponse = await res.json();
  return {
    props: {
      list: data.success ? data.list : [],
    },
  };
};

export default Home;

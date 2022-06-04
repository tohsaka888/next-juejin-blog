import { baseUrl } from "config/baseUrl";
import { GetServerSideProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import React from "react";
import { InfoResponse } from "../../config/type";
import { Box, useColorMode } from "@chakra-ui/react";
import highlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";

const ArticleDetail: NextPage<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}> = ({ source }) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <Box
      width="50vw"
      margin={"auto"}
      mt={"80px"}
      bg={colorMode === "light" ? "#fff" : undefined}
    >
      <MDXRemote {...source} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`${baseUrl}/api/post/${query.id}`);
  const data: InfoResponse = await res.json();
  const mdxSource = await serialize(data.info.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [highlight, rehypePrism],
    },
  });
  return { props: { source: mdxSource } };
};

export default ArticleDetail;

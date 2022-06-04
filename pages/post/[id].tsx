import { baseUrl } from "config/baseUrl";
import { GetServerSideProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { InfoResponse } from "../../config/type";
import { Box, useColorMode } from "@chakra-ui/react";
import highlight from "rehype-highlight";
import rehypePrism from "rehype-prism-plus";
import { H1, H2, H3, H4, H5, H6 } from "markdown/Heading";

const ArticleDetail: NextPage<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}> = ({ source }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      width="50vw"
      margin={"auto"}
      mt={"80px"}
      bg={colorMode === "light" ? "#fff" : undefined}
    >
      <MDXRemote
        {...source}
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
        }}
      />
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

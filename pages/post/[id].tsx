import { baseUrl } from "config/baseUrl";
import { GetServerSideProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import { ArticleInfo, InfoResponse } from "../../config/type";
import {
  Box,
  useColorMode,
  OrderedList,
  Flex,
  Avatar,
  Text,
  Image,
} from "@chakra-ui/react";
import rehypePrism from "rehype-prism-plus";
import { H1, H2, H3, H4, H5, H6 } from "markdown/Heading";
import Paragraph from "markdown/Paragraph";
import { OrderListItem } from "markdown/OrderList";
import codesandbox from "remark-codesandbox";
import embedIamge from "remark-embed-images";
import extendedTable from "remark-extended-table";
import reamrkTypescript from "remark-typescript";
import directive from "remark-directive";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import toc from "@jsdevtools/rehype-toc";
import Toc from "markdown/Toc";
import { shadows } from "config/theme";
import moment from "moment";
import { PrismTheme } from "../../styles/PrismTheme";

const ArticleDetail: NextPage<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  info: ArticleInfo;
}> = ({ source, info }) => {
  const { colorMode } = useColorMode();
  return (
    <Box bg={"#f9f9f9"} pt={"80px"}>
      <Box
        width="55vw"
        ml={"13vw"}
        bg={colorMode === "light" ? "#fff" : undefined}
        boxShadow={shadows[colorMode]}
        padding={"16px 24px"}
      >
        <H1>{info.title}</H1>
        <Flex justify={"space-between"}>
          <Flex>
            <Avatar src={info.avatarUrl} />
            <Flex
              flexDir={"column"}
              justify={"space-between"}
              ml={"16px"}
              mb={"16px"}
              height={"48px"}
            >
              <Text fontSize={"18px"} fontWeight={"700"}>
                {info.author}
              </Text>
              <Flex>
                <Text fontSize={"12px"}>
                  {moment(info.date).format("YYYY年MM月DD日 mm:ss")}
                </Text>
                <Text fontSize={"12px"} ml={"16px"}>
                  {info.views} 阅读
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={info.coverImage}
          style={{ width: "100%" }}
          alt=""
          mb={"24px"}
        />
        <PrismTheme>
          <MDXRemote
            {...source}
            components={{
              h1: H1,
              h2: H2,
              h3: H3,
              h4: H4,
              h5: H5,
              h6: H6,
              p: Paragraph,
              ol: OrderedList,
              li: OrderListItem,
              nav: Toc,
            }}
          />
        </PrismTheme>
      </Box>
      <PrismTheme />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`${baseUrl}/api/post/${query.id}`);
  const data: InfoResponse = await res.json();
  const mdxSource = await serialize(data.info.content, {
    mdxOptions: {
      remarkPlugins: [
        [codesandbox, { mode: "button" }],
        embedIamge,
        extendedTable,
        reamrkTypescript,
        directive,
        remarkGfm,
      ],
      rehypePlugins: [
        rehypePrism,
        rehypeAutolinkHeadings,
        slug,
        [toc, { tight: false }],
      ],
      format: "mdx",
    },
  });
  data.info.content = "";
  return { props: { source: mdxSource, info: data.info } };
};

export default ArticleDetail;

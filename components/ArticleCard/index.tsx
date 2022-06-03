import { useColorMode, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ListContext } from "../../context/Context";
import { a, useTrail, config } from "react-spring";
import { BsChatDots, BsDot, BsEye, BsHandThumbsUp } from "react-icons/bs";
import moment from "moment";
import "moment/locale/zh-cn";
import Image from "next/image";
import { useRouter } from "next/router";

moment.locale("zh-cn");

function ArticleCard() {
  const { colorMode } = useColorMode();
  const route = useRouter();
  const list = useContext(ListContext)!;
  const trail = useTrail(list.length, {
    from: { opacity: 0, transform: "translate3d(0,20px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: config.gentle,
  });
  return (
    <>
      {trail.map((style, index) => {
        const item = list[index];
        return (
          <a.div key={item.id} style={{ ...style, padding: "8px 16px" }}>
            <Box width={"100%"} padding={"8px 0px"}>
              <Flex align={"center"}>
                <Text
                  color={"#4e5969"}
                  cursor={"pointer"}
                  fontSize={"13px"}
                  _hover={{ color: "#1d7dfa" }}
                >
                  {item.author}
                </Text>
                <Text
                  fontSize={"13px"}
                  color={"#4e5969"}
                  pb={"2px"}
                  margin={"0px 8px"}
                >
                  |
                </Text>
                <Text fontSize={"13px"}>{moment(item.date).fromNow()}</Text>
                <Text
                  fontSize={"13px"}
                  color={"#4e5969"}
                  pb={"2px"}
                  margin={"0px 8px"}
                >
                  |
                </Text>
                {item.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <Text key={tag} fontSize={"13px"} color={"#4e5969"}>
                      {tag}
                    </Text>
                    {index !== item.tags.length - 1 && (
                      <BsDot style={{ margin: "0px 3px" }} />
                    )}
                  </React.Fragment>
                ))}
              </Flex>
              <Flex align={"center"} justify={"space-between"} mt={"8px"}>
                <Box width={"calc(48vw - 200px)"}>
                  <Flex>
                    <Text
                      fontWeight={700}
                      fontSize={"18px"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      lineHeight={"24px"}
                      mb={"6px"}
                      cursor={"pointer"}
                      onClick={() => route.push(`/post/${item.id}`)}
                    >
                      {item.title}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text
                      fontSize={"13px"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      lineHeight={"24px"}
                    >
                      {item.intro}
                    </Text>
                  </Flex>
                  <Flex align={"center"} mt={"8px"}>
                    <BsEye size={18} />
                    <Text ml={"4px"} fontSize={"13px"} lineHeight={"20px"}>
                      {item.views}
                    </Text>
                    <BsHandThumbsUp size={15} style={{ marginLeft: "16px" }} />
                    <Text ml={"4px"} fontSize={"13px"} lineHeight={"20px"}>
                      {item.like}
                    </Text>
                    <BsChatDots size={15} style={{ marginLeft: "16px" }} />
                    <Text ml={"4px"} fontSize={"13px"} lineHeight={"20px"}>
                      {item.comments}
                    </Text>
                  </Flex>
                </Box>
                <Image
                  width={"150px"}
                  height={"100px"}
                  style={{ minWidth: "120px", minHeight: "80px" }}
                  src={item.coverImage}
                  alt={"cover-image"}
                />
              </Flex>
            </Box>
            <Divider mt={"16px"} />
          </a.div>
        );
      })}
    </>
  );
}

export default ArticleCard;

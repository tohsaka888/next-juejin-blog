import { useColorMode, Box, Divider, Flex, Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalOverlay, useToast, list } from "@chakra-ui/react";
import React, { useCallback, useContext, useState } from "react";
import { ListContext, LoginStatusContext } from "../../context/Context";
import { a, useTrail, config, useSpring } from "react-spring";
import { BsChatDots, BsEye, BsHandThumbsUp } from "react-icons/bs";
import moment from "moment";
import "moment/locale/zh-cn";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArticleBriefInfo, AuthorArticleResponse, DeleteResponse } from "config/type";
import { baseUrl } from "config/baseUrl";

moment.locale("zh-cn");

function ArticleCard({ authorList = [], isDetele = false, delay }: { authorList: ArticleBriefInfo[], isDetele?: boolean, delay?: number }) {
  const route = useRouter();
  const props = useContext(ListContext);
  const [id, setId] = useState<string | number>("")
  const { loginStatus } = useContext(LoginStatusContext)!;
  const [deleted, setDeleted] = useState<boolean>(false);
  const toast = useToast();

  const trail = useTrail(deleted ? props?.list.length || 0 : (authorList.length || props?.list.length || 0), {
    from: { opacity: 0, transform: "translate3d(0,20px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: config.gentle,
  });

  const { isOpen, onClose, onOpen } = useDisclosure()

  const deleteStyle = useSpring({
    display: isDetele ? "block" : "none",
    opacity: isDetele ? 1 : 0,
    config: config.gentle,
    delay: delay || 0
  })

  const getList = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/user/${loginStatus.userId}`);
    const data: AuthorArticleResponse = await res.json();
    props?.setList(data.list);
  }, [loginStatus.userId, props])

  const handleDelete = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/post/delete/${id}`)
    const data: DeleteResponse = await res.json()
    if (data.success) {
      toast({
        description: data.msg,
        status: "success",
        position: "top",
      })
    } else {
      toast({
        description: data.msg,
        status: "error",
        position: "top",
      })
    }
    onClose()
    location.reload()
  }, [id, onClose, toast])

  return (
    <>
      {trail.map((style, index) => {
        let item = authorList[index] || props?.list[index];
        if (deleted && list) {
          item = props?.list[index] as ArticleBriefInfo;
        }
        return (
          <Flex key={item.id} alignItems={"center"} padding={"8px 16px"} justify={"center"}>
            <a.div style={{ ...deleteStyle }}>
              <Box mr={"16px"}>
                <Button onClick={() => {
                  onOpen()
                  setId(item.id)
                }} width={"50px"} height={"120px"} color={'#fff'} bg={"#e41818"} _hover={{ bg: '#e41818', color: '#fff', opacity: 0.6 }}>删除</Button>
              </Box>
            </a.div>
            <a.div style={{ ...style }}>
              <Box width={"100%"}>
                <Flex align={"center"}>
                  <Text
                    // color={"#4e5969"}
                    cursor={"pointer"}
                    fontSize={"13px"}
                    _hover={{ color: "#1d7dfa" }}
                    onClick={() => {
                      route.push(`/user/${item.authorId}`);
                    }}
                  >
                    {item.author}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    // color={"#4e5969"}
                    pb={"2px"}
                    margin={"0px 8px"}
                  >
                    |
                  </Text>
                  <Text fontSize={"13px"}>{moment.utc(item.date).fromNow()}</Text>
                  <Text
                    fontSize={"13px"}
                    // color={"#4e5969"}
                    pb={"2px"}
                    margin={"0px 8px"}
                  >
                    |
                  </Text>
                  <Text fontSize={"13px"}>
                    {item.tags}
                  </Text>
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
          </Flex>
        );
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={"300px"}>
          <ModalHeader>确定删除文章?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={"center"} fontWeight={"700"} fontSize={"18px"}>注意!删除后无法回复数据!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => { handleDelete() }}>
              确认
            </Button>
            <Button variant='ghost' onClick={onClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ArticleCard;

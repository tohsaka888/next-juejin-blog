import {
  Box,
  useColorMode,
  useToast,
  Flex,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Select,
  Textarea
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useScreenSize from "hooks/useScreenSize";
import { baseUrl } from "config/baseUrl";
import { LoginStatusContext } from "context/Context";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function EditDraft() {
  const [value, setValue] = useState<string>("");
  const { colorMode } = useColorMode();
  const screenSize = useScreenSize();
  const toast = useToast();
  const toastRef = useRef<any>();
  const timerRef = useRef<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const { loginStatus } = useContext(LoginStatusContext)!

  useEffect(() => {
    setValue(localStorage.getItem("draft") || "**Hello world!!!**");
  }, []);

  const autoSave = useCallback(
    (currentValue?: string) => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        localStorage.setItem("draft", currentValue || value);
        toastRef.current = toast({
          description: "自动保存成功",
          status: "success",
          position: "top",
        });
        window.setTimeout(() => {
          toast.closeAll();
        }, 1000);
      }, 1000);
    },
    [toast, value]
  );

  const publishArticle = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/post/add`, {
      method: "POST",
      body: JSON.stringify({
        title,
        tags: tag,
        intro,
        content: value,
        author: loginStatus.username,
        coverImage: coverImage,
      }),
    })
    const data = await res.json()
    onClose()
  }, [coverImage, intro, loginStatus.username, onClose, tag, title, value]);

  return (
    <>
      <Box height={"100vh"} pt={"70px"}>
        <Flex width={"100%"} mb={"8px"}>
          <Input placeholder="请输入文章标题" width={"45vw"} onChange={(e: any) => {
            setTitle(e.target.value)
          }} />
          <Input placeholder="请输入封面图url" width={"45vw"} onChange={(e: any) => {
            setCoverImage(e.target.value)
          }} />
          <Button
            margin={"0px 8px"}
            bg={"transparent"}
            border={"2px solid #1890ff"}
            color={"#1890ff"}
          >
            存草稿
          </Button>
          <Button
            bg={"#1890ff"}
            color="#fff"
            _active={{ background: "#1890ff", opacity: 0.8 }}
            _hover={{ background: "#1890ff", opacity: 0.8 }}
            onClick={onOpen}
          >
            发布文章
          </Button>
        </Flex>
        <Box data-color-mode={colorMode}>
          <MDEditor
            value={value}
            onChange={(value) => {
              setValue(value || "");
              autoSave(value);
            }}
            height={screenSize.height - 118}
            onBlur={() => {
              autoSave();
            }}
          />
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={"200px"}>
          <ModalHeader>完善信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder='请选择标签' onChange={(e: any) => {
              setTag(e.target.value)
            }}>
              <option value='前端'>前端</option>
              <option value='后端'>后端</option>
              <option value='Android'>Android</option>
              <option value='IOS'>IOS</option>
              <option value='算法'>算法</option>
            </Select>
            <Textarea placeholder="请输入简介" rows={8} margin={'16px 0px'} onChange={(e: any) => {
              setIntro(e.target.value)
            }} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} bg={"#1890ff"} color={"#fff"} onClick={() => {
              publishArticle()
            }}>
              发布文章
            </Button>
            <Button mr={3} onClick={onClose}>
              取消
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditDraft;

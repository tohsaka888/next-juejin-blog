import {
  Box,
  useColorMode,
  useToast,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import useScreenSize from "hooks/useScreenSize";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function EditDraft() {
  const [value, setValue] = useState<string>("");
  const { colorMode } = useColorMode();
  const screenSize = useScreenSize();
  const toast = useToast();
  const toastRef = useRef<any>();
  const timerRef = useRef<number>(0);

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
      }, 2000);
    },
    [toast, value]
  );

  return (
    <Box height={"100vh"} pt={"70px"}>
      <Flex width={"100%"} mb={"8px"}>
        <Input placeholder="请输入文章标题" width={"45vw"} />
        <Input placeholder="请输入封面图url" width={"45vw"} />
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
  );
}

export default EditDraft;

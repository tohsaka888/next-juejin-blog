import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

function Sider({ children }: Props) {
  return (
    <Box flex={1} marginLeft={"16px"} pos={"relative"} top={"0px"}>
      {/* fixed object */}
      <Box
        pos={"fixed"}
        top={"100px"}
        width={"16vw"}
        height={"80px"}
        border={"1px solid"}
        opacity={"0"}
      ></Box>
      {children}
    </Box>
  );
}

export default Sider;

import React from "react";
import { Heading } from "@chakra-ui/react";

const H1 = (props: any) => {
  return <Heading as={"h1"} size={"2xl"} mb={"16px"} {...props} />;
};
const H2 = (props: any) => {
  return <Heading as={"h2"} size={"xl"} mb={"16px"} {...props} />;
};
const H3 = (props: any) => {
  return <Heading as={"h3"} size={"lg"} mb={"16px"} {...props} />;
};
const H4 = (props: any) => {
  return <Heading as={"h4"} size={"md"} mb={"16px"} {...props} />;
};
const H5 = (props: any) => {
  return <Heading as={"h5"} size={"sm"} mb={"16px"} {...props} />;
};
const H6 = (props: any) => {
  return <Heading as={"h6"} size={"xs"} mb={"16px"} {...props} />;
};

export { H1, H2, H3, H4, H5, H6 };

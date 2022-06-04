import React from "react";
import { Heading } from "@chakra-ui/react";

const H1 = (props: any) => {
  return <Heading as={"h1"} size={"2xl"} {...props} />;
};
const H2 = (props: any) => {
  return <Heading as={"h2"} size={"xl"} {...props} />;
};
const H3 = (props: any) => {
  return <Heading as={"h3"} size={"lg"} {...props} />;
};
const H4 = (props: any) => {
  return <Heading as={"h4"} size={"md"} {...props} />;
};
const H5 = (props: any) => {
  return <Heading as={"h5"} size={"sm"} {...props} />;
};
const H6 = (props: any) => {
  return <Heading as={"h6"} size={"xs"} {...props} />;
};

export { H1, H2, H3, H4, H5, H6 };

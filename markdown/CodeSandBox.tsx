import React from "react";
import { useColorMode } from '@chakra-ui/react'
import { shadows } from "config/theme";

type Props = {
  url: string;
};

function CodeSandBox({ url }: Props) {
  const { colorMode } = useColorMode();
  return (
    <iframe
      src={url + `theme=${colorMode}`}
      style={{
        width: "100%",
        height: "700px",
        border: 0,
        overflow: "hidden",
        boxShadow: shadows[colorMode],
        margin: "24px 0px",
      }}
      title="thirsty-darkness-bws3w"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}

export default CodeSandBox;
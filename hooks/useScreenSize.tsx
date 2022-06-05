import React, { useDeferredValue, useState, useEffect } from "react";

function useScreenSize() {
  const [screenSize, setScreenSize] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });
  const defferedScreenSize = useDeferredValue(screenSize);

  useEffect(() => {
    setScreenSize({ height: window.innerHeight, width: window.innerWidth });
    window.addEventListener("resize", () => {
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });

    return () => {
      window.removeEventListener("resize", () => {
        console.log("removed");
      });
    };
  }, []);

  return defferedScreenSize;
}

export default useScreenSize;

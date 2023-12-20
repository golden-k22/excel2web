import React, { useState } from "react";
import { Maximize } from "react-feather";
import { LI } from "../../AbstractElements";

const FullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document?.exitFullscreen();
    }
  };

  return (
    <LI className="full-screen">
      <a href="#javascript" className="text-dark">
        <Maximize onClick={()=>{fullScreenHandler(!fullScreen)}} />
      </a>
    </LI>
  );
};

export default FullScreen;

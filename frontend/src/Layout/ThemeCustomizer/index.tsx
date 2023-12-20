import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ThemeCustomizerTypes } from "./ThemeCustomizerTypes";
import NavCustomizer from "./NavCustomizer";
import TabCustomizer from "./TabCustomizer";

const Customizer = () => {
  const { toggleThemeCustomizer } = useSelector(
    (state: ThemeCustomizerTypes) => state.ThemeCustomizer
  );

  const [selected, setSelected] = useState("General-setting");
  const callbackNav = (select: string) => {
    setSelected(select);
  };
  return (
    <>
      <div
        className={`customizer-contain ${toggleThemeCustomizer ? "open" : ""} `}
      >
        <div
          className={`customizer-links ${toggleThemeCustomizer ? "open" : ""}`}
        >
          <NavCustomizer callbackNav={callbackNav} selected={selected} />
          <TabCustomizer selected={selected} callbackNav={callbackNav} />
        </div>
      </div>
    </>
  );
};

export default Customizer;

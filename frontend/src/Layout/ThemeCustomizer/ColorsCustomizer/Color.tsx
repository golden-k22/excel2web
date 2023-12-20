import { Fragment, useState } from "react";
import { H6, LI, UL } from "../../../AbstractElements";
import { DarkLayout, LightLayout } from "../../../Constant";
import {darkLayoutData,lightLayoutData,} from "../../../Data/Layout/ThemeCustomzer";

const ColorsComponent = () => {
  const [colorBackground1, setColorBackground1] = useState("");
  const [colorBackground2, setColorBackground2] = useState("");

  const OnUnlimatedColorClick = (primaryColor: string,secondaryColor: string) => {
    setColorBackground1(primaryColor);
    setColorBackground2(secondaryColor);
    document.documentElement.style.setProperty("--primary-color",colorBackground1);
    document.documentElement.style.setProperty("--secondary-color",colorBackground2);
  };

  return (
    <Fragment>
      <H6 className="mb-1">{LightLayout}</H6>
      <UL className="layout-grid customizer-color d-block">
        {lightLayoutData.map((data, index) => (
          <LI key={index} onClick={() =>OnUnlimatedColorClick(data.parameterOne, data.parameterOne)}className="color-layout">
            <div/>
          </LI>
        ))}
      </UL>
      <H6 className="mb-1">{DarkLayout}</H6>
      <UL className="layout-grid customizer-color d-block dark">
        {darkLayoutData.map((data, index) => (
          <LI key={index} onClick={() =>OnUnlimatedColorClick(data.parameterOne, data.parameterOne)}className="color-layout">
            <div />
          </LI>
        ))}
      </UL>
    </Fragment>
  );
};

export default ColorsComponent;

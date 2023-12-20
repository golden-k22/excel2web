import { useState } from "react";
import SidebarBackGroundNavCustomizer from "./SidebarBackGroundNavCustomizer";
import { H6 } from "../../../AbstractElements";
import SidebarBackGroundNavTab from "./SidebarBackGroundNavTab";
import { SideBarBackGroundSetting } from "../../../Constant";

const SideBarBackGroundSettingType = () => {
  const [selected, setSelected] = useState("Color");
  const callbackNav = (select: string) => {
    setSelected(select);
  };
  return (
    <>
      <H6 className="mb-1">{SideBarBackGroundSetting}</H6>
      <SidebarBackGroundNavCustomizer callbackNav={callbackNav} selected={selected}/>
      <SidebarBackGroundNavTab selected={selected} />
    </>
  );
};

export default SideBarBackGroundSettingType;

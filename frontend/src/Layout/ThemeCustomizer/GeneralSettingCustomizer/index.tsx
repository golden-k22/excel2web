import { Fragment } from "react";
import LayoutType from "./LayoutType";
import SidebarType from "./SidebarType";
import SideBarBackGroundSettingType from "./SideBarBackGroundSettingType";

const GeneralSettingCustomizer = () => {
  return (
    <Fragment>
      <LayoutType />
      <SidebarType />
      <SideBarBackGroundSettingType />
    </Fragment>
  );
};

export default GeneralSettingCustomizer;

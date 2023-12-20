import { Fragment } from "react";
import { H6, LI, UL } from "../../../AbstractElements";
import SettingDots from "./SettingDots";
import { useDispatch } from "react-redux";
import { SidebarTypeHeading } from "../../../Constant";

const SidebarType = () => {
  let sidebarData = ["horizontal-wrapper", "compact-wrapper"];
  const dispatch = useDispatch();
  const handleSidebarType = (e: any, type: any) => {
    e.preventDefault();
    dispatch({ type: "addSidebarTypes", payload: type });
  };

  return (
    <Fragment>
      <H6 className="mb-2">{SidebarTypeHeading}</H6>
      <UL  className=" simple-list flex-row sidebar-type layout-grid">
        {sidebarData.map((data, index) => (
          <LI onClick={(e: any) => handleSidebarType(e, data)} key={index}>
            <div className="header bg-light">
              <SettingDots />
            </div>
            <div className="body">
              <UL className="simple-list">
                <LI className="bg-dark sidebar"></LI>
                <LI className="bg-light body w-100"></LI>
              </UL>
            </div>
          </LI>
        ))}
      </UL>
    </Fragment>
  );
};

export default SidebarType;

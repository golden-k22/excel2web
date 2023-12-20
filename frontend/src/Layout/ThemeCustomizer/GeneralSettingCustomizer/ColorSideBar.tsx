import { useDispatch } from "react-redux";
import { LI, UL } from "../../../AbstractElements";
import { sidebarColorData } from "../../../Data/Layout/ThemeCustomzer";

const ColorSideBar = () => {
  const dispatch = useDispatch();
  const colorSidebarHandler = (data: string) => {
    dispatch({ type: "addSideBarBackGround", payload: data });
    document.body.className = data
  };
  return (
    <UL className="sidebar-bg-settings flex-row">
      {sidebarColorData.map((data, index) => (
        <LI
          className={data.className}
          onClick={() => colorSidebarHandler(data.paraMeterValue)}
          key={index}
        />
      ))}
    </UL>
  );
};

export default ColorSideBar;

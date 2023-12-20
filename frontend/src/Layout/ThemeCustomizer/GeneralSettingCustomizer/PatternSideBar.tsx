import { useDispatch } from "react-redux";
import { sidebarPatternData } from "../../../Data/Layout/ThemeCustomzer";
import { LI, UL } from "../../../AbstractElements";
const PatternSideBar = () => {
  const dispatch = useDispatch();
  const sideBarPatternHandle = (data: string) => {
    dispatch({ type: "addSideBarBackGround", payload: data });
    document.body.className = data
  };

  return (
    <UL className="sidebar-bg-settings flex-row simple-list">
      {sidebarPatternData.map((data, index) => (
        <LI
          key={index}
          className={data.className}
          onClick={() => sideBarPatternHandle(data.paraMeterValue)}
        />
      ))}
    </UL>
  );
};

export default PatternSideBar;

import { useDispatch } from "react-redux";
import { sidebarImageData } from "../../../Data/Layout/ThemeCustomzer";
import { LI, UL } from "../../../AbstractElements";

const ImageSideBar = () => {
  const dispatch = useDispatch();
  const sideBarImageHandle = (data: string) => {
    dispatch({ type: "addSideBarBackGround", payload: data });
    document.body.className = data
  };

  return (
    <UL className="sidebar-bg-settings flex-row simple-list">
      {sidebarImageData.map((data, index) => (
        <LI
          key={index}
          className={data.className}
          onClick={() => sideBarImageHandle(data.paraMeterValue)}
        />
      ))}
    </UL>
  );
};

export default ImageSideBar;

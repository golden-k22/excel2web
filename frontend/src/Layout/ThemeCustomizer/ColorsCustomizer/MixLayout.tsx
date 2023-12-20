import { useDispatch } from "react-redux";
import { H6, LI, UL } from "../../../AbstractElements";
import { mixLayoutDatas } from "../../../Data/Layout/ThemeCustomzer";
import { MixLayoutHeading } from "../../../Constant";
import SettingDots from "../GeneralSettingCustomizer/SettingDots";

const MixLayout = () => {
  const dispatch = useDispatch();
  const handleMixLayout = (data: string) => {
    dispatch({ type: "addSideBarBackGround", payload: data });
    document.body.className = data
  };
  return (
    <>
      <H6 className="mb-1">{MixLayoutHeading}</H6>
      <UL className="layout-grid customizer-mix flex-row simple-list d-block">
        {mixLayoutDatas.map((data, index) => (
          <LI
            className="color-layout"
            onClick={() => handleMixLayout(data.paraMeterValue)}
            key={index}
          >
            <div className={`header bg-${data.divClassName}`}>
              <SettingDots />
            </div>
            <div className="body">
              <ul>
                <li className={`bg-${data.bodyListClass1} sidebar`}></li>
                <li className={`bg-${data.bodyListClass2} body`}> </li>
              </ul>
            </div>
          </LI>
        ))}
      </UL>
    </>
  );
};

export default MixLayout;

import { useState } from "react";
import { H6, LI, UL } from "../../../AbstractElements";
import { layoutType } from "../../../Constant";
import { useDispatch } from "react-redux";
import { layoutTypeData } from "../../../Data/Layout/ThemeCustomzer";

const LayoutType = () => {
  const [layout_type, setLayout_type] = useState("ltr");
  const dispatch = useDispatch();
  const handleLayout = (layout: string) => {
    dispatch({ type: "addLayout", payload: layout });
    setLayout_type(layout);
    if (layout === "rtl") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
      document.body.classList.remove("box-layout");
      document.documentElement.dir = "rtl";
    } else if (layout === "ltr") {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
      document.body.classList.remove("box-layout");
      document.documentElement.dir = "ltr";
    } else if (layout === "box-layout") {
      document.body.classList.remove("ltr");
      document.body.classList.remove("rtl");
      document.body.classList.add("box-layout");
      document.documentElement.dir = "ltr";
    }
  };
  return (
    <>
      <H6 className="mb-2">{layoutType}</H6>
      <UL className="main-layout layout-grid simple-list flex-row">
        {layoutTypeData.map((data, index) => (
          <LI
            key={index}
            className={`${layout_type === data.paraMeterValue ? "active" : ""}`}
            onClick={() => handleLayout(data.paraMeterValue)}
          >
            <div className="body">
              <UL className="simple-list d-block">
                <LI className="body">
                  <span className="badge badge-light">{data.tittle}</span>
                </LI>
              </UL>
            </div>
          </LI>
        ))}
      </UL>
    </>
  );
};

export default LayoutType;

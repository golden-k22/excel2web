import { useState,useEffect } from "react";
import MenuList from "./SideBarItems";
import { LI, UL } from "../../AbstractElements";
import { Back } from "../../Constant";
import { useSelector } from "react-redux";
import { ThemeCustomizerTypes } from "../ThemeCustomizer/ThemeCustomizerTypes";
import ConfigDB from "../../config/ThemeConfig";
import { ArrowLeft, ArrowRight,Grid, Home  } from "react-feather";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState([]);
  const { toggleIcon } = useSelector((state: ThemeCustomizerTypes) => state.ThemeCustomizer);
  const wrapper = ConfigDB.data.settings.sidebar.type;
  const LayoutType = ConfigDB.data.settings.layout_type
  const [margin, setMargin] = useState(0);
  const [leftArrow, setLeftArrow] = useState(true);
  const [rightArrow, setRightArrow] = useState(false);
  const scrollToRight = () => {
    if (margin === 0) {
      setMargin((margin) => (margin += -600));
      setRightArrow(true)
      setLeftArrow(false)
    }

  };
  const scrollToLeft = () => {
    if (margin === -600) {
      setMargin(0);
      setLeftArrow(true)
      setRightArrow(false)
    }

  };


  function getCookie(cname: any) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    {
      title: "Admin Panel",
      icon: <Home />,
      menu: [
        {
          title: "User List",
          url: `${process.env.PUBLIC_URL}/admin_panel/user_list`,
          type: "link",
        },
        {
          title: "Employee List",
          url: `${process.env.PUBLIC_URL}/admin_panel/employee_list`,
          type: "link",
        },
      ],
    },
    {
      title: "Support",
      icon: <Grid />,
      // url:"https://support.pixelstrap.com/"
    },
  ]);
  useEffect(() => {
    if(getCookie("jwt")){
      setMenuItems([
        {
          title: "Support",
          icon: <Grid />,
          // url:"https://support.pixelstrap.com/"
        },
      ]);
    }else{
      setMenuItems([
        {
          title: "Admin Panel",
          icon: <Home />,
          menu: [
            {
              title: "User List",
              url: `${process.env.PUBLIC_URL}/admin_panel/user_list`,
              type: "link",
            },
            {
              title: "Employee List",
              url: `${process.env.PUBLIC_URL}/admin_panel/employee_list`,
              type: "link",
            },
          ],
        },
        {
          title: "Support",
          icon: <Grid />,
          // url:"https://support.pixelstrap.com/"
        },
      ]);
    }
  }, [document.cookie]);

  return (
    <header className={`main-nav ${toggleIcon ? " close_icon" : ""}`}>
      <nav>
        <div className="main-navbar">
          <div className={`left-arrow ${leftArrow ? "disabled" : ""}`} id="left-arrow" onClick={scrollToLeft}><ArrowLeft /></div>
          <div id="mainnav" style={(wrapper === "horizontal-wrapper") && (LayoutType === "box-layout") ? { left: margin + "px" } : { margin: "0px" }}>
            <UL className="nav-menu custom-scrollbar simple-list" style={{ display: "block" }}>
              <LI className="back-btn">
                <div className="mobile-back text-end">
                  <span>{Back}</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true" />
                </div>
              </LI>
              <MenuList menu={menuItems} isOpen={isOpen} setIsOpen={setIsOpen} level={0}/>
            </UL>
          </div>
          {(wrapper === "horizontal-wrapper") && (LayoutType === "box-layout") ? <div className={`right-arrow ${rightArrow ? "disabled" : ""}`} onClick={scrollToRight}><ArrowRight /></div> : ""}
        </div>
      </nav>
    </header>
  );
};

export default Sidebar;

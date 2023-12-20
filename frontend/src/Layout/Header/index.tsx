import { Fragment, useEffect, useState } from "react";
import LeftHeader from "./LeftHeader";
import Switch from "./Switch";
import SearchBar from "./SearchBar";
import BellCompo from "./BellCompo";
import Message from "./Message";
import FullScreen from "./FullScreen";
import UserProfile from "./UserProfile";
import { MoreHorizontal, Settings } from "react-feather";
import { Col } from "reactstrap";
import { LI, UL } from "../../AbstractElements";
import DarkMode from "./DarkMode";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { ThemeCustomizerTypes } from "../ThemeCustomizer/ThemeCustomizerTypes";
import Bookmarks from "./Bookmark";
import Language from "./Language";

const Header = () => {
   const  dispatch =useDispatch()
  const {toggleThemeCustomizer,toggleIcon  } = useSelector((state:ThemeCustomizerTypes) => state.ThemeCustomizer);

  const [toogleNav, setToogleNav] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        dispatch({type:"setToggleIcon",payload:true})
      } else {
        dispatch({type:"setToggleIcon",payload:false})
      }
    });
  }, [toggleIcon]);

  return (
    <Fragment>
      <div className={`page-main-header${toggleIcon ? " close_icon" : ""}`}>
        <div className="main-header-right ">
          <LeftHeader />
          {/* <Switch /> */}
          <Col className="nav-right  pull-right right-menu">
            <UL className={`nav-menus flex-row simple-list ${toogleNav ? "open" : ""} `}>
              {/* <SearchBar /> */}
              {/* <Language/> */}
              {/* <Bookmarks/>   */}
              <DarkMode/>
              {/* <BellCompo /> */}
              {/* <Message /> */}
              <FullScreen />
              {/* <LI className={"theme-setting"}>
                <Settings
                  onClick={() => {
                    dispatch({ type: "setToggleThemeCustomizer", payload: !toggleThemeCustomizer });
                  }}
                />
              </LI> */}
              <UserProfile />
            </UL>
          </Col>
          <div className="d-lg-none mobile-toggle pull-right">
            <MoreHorizontal onClick={() => setToogleNav(!toogleNav)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

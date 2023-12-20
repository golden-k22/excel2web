import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ActiveNavLinkUrl } from '../../Service';
import {  sidebarTypes } from './SideBarTypes';
import { LI, UL } from '../../AbstractElements';
import { useTranslation } from 'react-i18next';
import ConfigDB from '../../config/ThemeConfig';
const SidebarSubMenu = ({ menu, className, setIsOpen, isOpen, level }:sidebarTypes) => {
  const sideBarType =ConfigDB.data.settings.sidebar.type
  const { pathname } = useLocation();
  const { t } = useTranslation();

  function shouldSetActive({ item }:any) {
    var returnValue = false;
    if (item?.url === pathname) {
      returnValue = true;
    }
    if (!returnValue && item?.menu) {
      item?.menu.every((subItem:any) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  }
  useEffect(() => {
    menu.forEach((item) => {
      let gotValue = shouldSetActive({ item });
      if (gotValue) {
        let temp = isOpen;
        temp[level] = item.title;
        setIsOpen(temp);
      }
    });
  }, [menu]);

  return (
    <>
      {menu.map((item:any, i:number) => (
        <LI key={i} className={`${className ? '' : 'dropdown'} ${(item.menu ? item.menu.map((innerItem:any) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || isOpen[level] === item.title ? 'active' : ''} `}>
          <Link
            className={`${className ? '' : 'nav-link menu-title'}  ${(item.menu ? item.menu.map((innerItem:any) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || isOpen[level] === item.title ? 'active' : ''}`}
            to={item.url ? item.url : '#javascript'}
            onClick={() => {
              const temp = isOpen;
              temp[level] = item.title !== temp[level] && item.title;
              setIsOpen(temp);
            }}>
              {level=== 0 && item.icon ? item.icon:""}
              <span >{t(item.title)}</span>
            {item.menu && (
              sideBarType === "horizontal-wrapper" && level >0 ? <span className="sub-arrow"><i className="fa fa-chevron-right" /></span>:
              <span className='according-menu'>
                <i className="fa fa-angle-double-right"></i>
              </span>
            )}
          </Link>
          {item.menu && 
            <UL className={sideBarType === "horizontal-wrapper" && level >0 ? "nav-sub-childmenu submenu-content":"nav-submenu menu-content" }>
            <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={level + 1} className='sidebar-submenu' />
          </UL>
          }
        </LI>
      ))}
    </>
  );
};
export default SidebarSubMenu;

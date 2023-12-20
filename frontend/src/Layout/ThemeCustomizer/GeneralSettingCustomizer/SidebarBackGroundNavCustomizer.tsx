import { Nav, NavItem, NavLink } from "reactstrap";
import { sidebarBackGroundNav } from "../../../Data/Layout/ThemeCustomzer";
interface propsType {
  callbackNav: (select: string) => void;
  selected: string;
}

const SidebarBackGroundNavCustomizer = ({callbackNav,selected,}: propsType) => {
  return (
    <Nav className="nac-pills nav-primary">
      {sidebarBackGroundNav.map((data, index) => (
        <NavItem key={index}>
          <NavLink
            className={selected === data ? "active" : ""}
            onClick={() => callbackNav(data)}
          >
            {data}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default SidebarBackGroundNavCustomizer;

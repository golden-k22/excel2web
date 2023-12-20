import { Nav, NavItem, NavLink } from "reactstrap";
interface propsType {
  callbackNav: (select: string) => void;
  selected: string;
}
const NavCustomizer = ({ callbackNav, selected }: propsType) => {
  let navData = ["General-setting", "Colors"];
  return (
    <Nav className="nac-pills">
      {navData.map((data, index) => (
        <NavItem key={index}>
          <NavLink
            className={selected === data ? "active" : ""}
            onClick={() => callbackNav(data)}
          >
            <div className="settings">
              <i className="icofont icofont-ui-settings" /> {data}
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavCustomizer;

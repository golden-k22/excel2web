import { TabContent, TabPane } from "reactstrap";
import ColorSideBar from "./ColorSideBar";
import PatternSideBar from "./PatternSideBar";
import ImageSideBar from "./ImageSideBar";
interface propsType {
  selected: string;
}
const SidebarBackGroundNavTab = ({ selected }: propsType) => {
  return (
    <TabContent activeTab={selected}>
      <TabPane tabId="Color"><ColorSideBar /></TabPane>
      <TabPane tabId="Pattern"><PatternSideBar /> </TabPane>
      <TabPane tabId="image"> <ImageSideBar /> </TabPane>
    </TabContent>
  );
};

export default SidebarBackGroundNavTab;

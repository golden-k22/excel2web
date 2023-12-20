import { LI, UL } from "../AbstractElements";
import { socialMediaIconsData } from "../Data/SocialMediaIconsData";
interface propsTypes {
  listClassName?: string;
}
const SocialMediaIcons = ({ listClassName }: propsTypes) => {
  return (
    <UL className={`simple-list flex-row justify-content-center  ${listClassName ? listClassName : ""}`} >
      {socialMediaIconsData.map((data, index) => (
        <LI key={index}>
          <a href={data.link}>
            <i className={`fa ${data.iconClassName} me-0`}></i>
          </a>
        </LI>
      ))}
    </UL>
  );
};

export default SocialMediaIcons;

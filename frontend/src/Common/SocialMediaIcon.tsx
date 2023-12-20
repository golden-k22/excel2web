import { LI, UL } from "../AbstractElements";
import { socialMediaIconData } from "../Data/SocialMediaIconData";

const SocialMediaIcon = () => {
 return (
 <UL className="simple-list flex-row justify-content-center list-inline">
 {socialMediaIconData.map((data, index) => (
 <LI className="list-inline-item" key={index}>
 <a href={data.link}>
 <i className={`fa ${data.icon}`} />
 </a>
 </LI>
 ))}
 </UL>
 );
};

export default SocialMediaIcon;
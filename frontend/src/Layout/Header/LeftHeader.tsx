import { Image } from "../../AbstractElements";
import { Link } from "react-router-dom";
const LeftHeader = () => {
  const images = require.context("../../assets/images/logo", true);
  const dynamicImage = (image: string) => {
    return images(`./${image}`);
  };
  return (
    <div className="main-header-left">
      <div className="logo-wrapper">
      {/* <Link to={`${process.env.PUBLIC_URL}/`}> */}
        <Image body={true} src={dynamicImage("compact-logo.png")} alt="logo" />     
      {/* </Link> */}
      </div> 
    </div>
  );
};

export default LeftHeader;

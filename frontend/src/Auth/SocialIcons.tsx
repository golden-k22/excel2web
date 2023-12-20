import { Col, Row } from "reactstrap";
import { Btn } from "../AbstractElements";
import { Facebook, GooglePlus, Twitter } from "../Constant";
import { Link } from "react-router-dom";

const SocialIcons = () => {
  return (
    <>
      <div className="login-divider" />
      <div className="social mt-3">
        <Row className="g-2 btn-showcase">
          <Col md="4" sm="6">
            <Link to="https://www.facebook.com/"><Btn color="transparent" className="social-btn btn-fb">{Facebook}</Btn></Link>
          </Col>
          <Col md="4" sm="6">
            <Link to="https://www.twitter.com/"><Btn color="transparent" className="social-btn btn-twitter">{Twitter}</Btn></Link>
          </Col>
          <Col md="4" sm="6">
            <Link to="https://www.google.com/"><Btn color="transparent" className="social-btn btn-google">{GooglePlus}</Btn></Link>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SocialIcons;

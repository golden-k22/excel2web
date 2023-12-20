import React from "react";
import { CardBody, Col, Container, Row } from "reactstrap";
import LoginPage from "./LoginPage";

const Logins = () => {
  return (
    <div className="page-wrapper compact-wrapper">
      <Container fluid className="p-0">
        <div className="authentication-main mt-0">
          <Row>
            <Col md="12">
              <div className="auth-innerright auth-bg">
                <div className="authentication-box">
                  <div className="mt-4">
                    <CardBody className="p-0">
                      <LoginPage  />
                    </CardBody>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Logins;

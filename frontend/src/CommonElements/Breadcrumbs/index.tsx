import { Container, Row, Col, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { OL, H3 } from "../../AbstractElements";

 interface propsTypes {
  title: any;
  parent: string;
}

const Breadcrumbs = (props: propsTypes) => {
  const { title = "", parent = "" } = props;
  return (
      <Container fluid={true}>
        <div className="page-header">
          <Row>
            <Col lg="6">
              <OL className="breadcrumb">
                <BreadcrumbItem>
                  <Link to={`${process.env.PUBLIC_URL}/dashboard/business`}>
                    <i className="f-16 fa fa-home"></i>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>{parent}</BreadcrumbItem>
                <BreadcrumbItem active>{title}</BreadcrumbItem>
              </OL>
              <H3> {title}</H3>
            </Col>
          </Row>
        </div>
      </Container>
  );
};

export default Breadcrumbs;

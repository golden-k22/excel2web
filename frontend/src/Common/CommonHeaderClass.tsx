import { Card, CardBody } from "reactstrap";
import HeadingCommon from "./HeadingCommon";

export interface propsTypes {
  children?: string;
  className?: string;
  title: string;
}

const CommonHeaderClass = (props: propsTypes) => {
  return (
    <Card>
      <HeadingCommon Heading={props.title} />
      <CardBody className="card-body">
        <pre className="helper-classes">{props.children}</pre>
      </CardBody>
    </Card>
  );
};

export default CommonHeaderClass;

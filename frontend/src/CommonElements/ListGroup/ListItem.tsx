import { Fragment } from "react";
import { ListGroupItem } from "reactstrap";


const LI = (props: any) => {
  return (
    <Fragment>
      <ListGroupItem {...props}>{props.children}</ListGroupItem>
    </Fragment>
  );
};

export default LI;

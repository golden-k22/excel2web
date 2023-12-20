import { Alert } from "reactstrap";

const Alerts = (props: any) => {
  return (
    <Alert {...props}>
      {props.children}
    </Alert>
  );
};

export default Alerts;


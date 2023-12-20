import { CardHeader } from "reactstrap";
import { Btn, H5 } from "../AbstractElements";
import { ChevronDown, ChevronUp } from "react-feather";

interface propsTypes {
  setIsOpen: (parameter: boolean) => void;
  isOpen: boolean;
  Heading: string;
}
const HeaderWithIcon = ({ setIsOpen, isOpen, Heading }: propsTypes) => {
  return (
    <CardHeader>
      <H5 className="mb-0">
        <Btn
          className="btn-link ps-0 d-flex justify-content-between"
          onClick={() => setIsOpen(!isOpen)}
          color="transperant"
        >
          {Heading}
          {isOpen ? (
            <ChevronUp className="m-0" />
          ) : (
            <ChevronDown className="m-0" />
          )}
        </Btn>
      </H5>
    </CardHeader>
  );
};

export default HeaderWithIcon;

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Btn } from "../AbstractElements";

const CommonModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggler}
      size={props.size}
      centered={props.centered ? true : false}
    >
      <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
      <ModalBody className={props.bodyClass}>{props.children}</ModalBody>
      <ModalFooter>
        <Btn color="primary" onClick={props.toggler}>
          Cancel
        </Btn>
        {props.sendMessage ? (
          <Btn color="secondary" onClick={props.toggler}>
            send Message
          </Btn>
        ) : (
          <Btn color="danger" onClick={props.toggler}>
            Delete
          </Btn>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CommonModal;

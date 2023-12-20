import { Fragment, useState } from "react";
import { Btn, P } from "../../../AbstractElements";
import CommonModal from "../../../Common/modal";

const AllDeleteModalBtn = (props:any) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  function deleteItem(value: any){
    toggle();
    if (value.target.innerText=="Delete"){
      props.delete();
    }
  }
  return (
    <Fragment>
      <Btn className="btn btn-danger" onClick={deleteItem}><i className='fa fa-trash' aria-hidden="true"></i> {props.title}</Btn>
      <CommonModal centered="centered" isOpen={modal} title={props.title} toggler={deleteItem}>
        <P>{props.content}</P>
      </CommonModal>
    </Fragment>
  );
};

export default AllDeleteModalBtn;

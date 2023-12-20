import React, { Fragment } from "react";

interface propsTypes {
  children?: any;
  className?: string;
  innerHtml?: any;
  dangerouslySetInnerHTML?: any;
  id?:string
}

const P = (props: propsTypes) => {
  return (
    <Fragment>
      <p {...props}>{props.children}</p>
    </Fragment>
  );
};

export default P;

import  { Fragment, useState } from "react";
import { useEffect } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <Fragment>
      {show && (
        <div className="loader-wrapper">
          <div className="theme-loader" />
        </div>
      )}
    </Fragment>
  );
};

export default Loader;

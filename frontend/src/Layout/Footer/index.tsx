import React from "react";

const FooterLayout = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 footer-copyright">
            <p className="mb-0">Copyright 2023 © Xolo All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <p className="pull-right mb-0">
              Hand crafted &amp; made with &nbsp;
              <i className="fa fa-heart" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;

import React, { Fragment } from "react";
import { Bell } from "react-feather";
import { H6, LI, P, UL } from "../../AbstractElements";
import { notification } from "../../Data/Layout/Header/BellCompo";
import { Link } from "react-router-dom";
const BellCompo = () => {
  return (
    <Fragment>
      <LI className="onhover-dropdown">
        <Bell />
        <UL className="notification-dropdown onhover-show-div simple-list">
          <LI>
            <H6 className="f-w-600">Notifications</H6>
            <span className="f-12">You have 2 unread messages</span>
          </LI>
          {notification.map((item, index) => (
            <Fragment key={index}>
              <LI>
                <P className="mb-0">
                  <i className={item.symbol}> </i>
                  <Link to={`${process.env.PUBLIC_URL}/ECommerce/OrderHistory`}>{item.notificationsTittle}</Link>
                  <span className="pull-right">{item.notificationsTime}</span>
                </P>
              </LI>
            </Fragment>
          ))}
          <LI className="bg-light txt-dark">
            <a href="#javascript">All </a> notification
          </LI>
        </UL>
      </LI>
    </Fragment>
  );
};

export default BellCompo;

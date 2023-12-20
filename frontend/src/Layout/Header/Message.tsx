import React, { Fragment } from "react";
import { MessageCircle } from "react-feather";
import { Image, LI, P, UL } from "../../AbstractElements";
import { Messages } from "../../Data/Layout/Header/Messages";
import { Link } from "react-router-dom";
const Message = () => {


  return (
    <Fragment>
      <LI className="onhover-dropdown">
        <MessageCircle />
        <UL
          className={"chat-dropdown simple-list onhover-show-div p-t-20 p-b-20 simple-list"}
        >
          {Messages.map((item, index) => (
            <Fragment key={index}>
              <LI>
                <div className="d-flex align-items-start">
                  <Image
                    className="img-fluid rounded-circle me-3"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                  />
                  <div className={item.statusClass}></div>
                  <div className="media-body">
                    <Link to={`${process.env.PUBLIC_URL}/email/email-app`}><span className="f-w-600">{item.userName}</span></Link>
                    <P className="f-12 mb-0 light-font">
                      There are many variations of passages...
                    </P>
                    <P className="f-12 mb-0 font-primary">{item.MessageTime}</P>
                  </div>
                </div>
              </LI>
            </Fragment>
          ))}
          <LI className="light-font text-center">Mark all as read </LI>
        </UL>
      </LI>
    </Fragment>
  );
};
export default Message;

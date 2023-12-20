import { ChevronRight, LogIn, User } from "react-feather";
import {   Image, LI, UL } from "../../AbstractElements";
import { ProfilesMessage } from "../../Data/Layout/Header/Profiles";
import { dynamicImage } from "../../Service";
import { Admin, ElanaSaint,  Logout, Profile } from "../../Constant";
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
// import Cookies from 'universal-cookie';

const UserProfile = () => {
  const navigate  =useNavigate() 

  function setCookie(cname:any, cvalue:any, exdays:any) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname:any) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const handleLogOut  = ()=>{
    localStorage.clear();
    setCookie("jwt","", -1);
    setCookie("token","", -1);
    
    navigate(`${process.env.PUBLIC_URL}/login`);
  }
  return (
    <LI className="onhover-dropdown px-0">
      <span className="d-flex user-header">
        <Image
          className="me-2 rounded-circle img-35"
          src={dynamicImage("dashboard/user.png")}
          alt="userdp"
        />
        <span className="flex-grow-1">
          <span className="f-12 f-w-600">{localStorage.getItem("user_f_name")+' '+localStorage.getItem("user_l_name")}</span>
          {/* <span className="d-block">{Admin}</span> */}
        </span>
      </span>
      <UL className="profile-dropdown  onhover-show-div simple-list">
        {/* <LI>
          <Link to={`${process.env.PUBLIC_URL}/user/user-profile`}>
            <User />
            {Profile}
          </Link>
        </LI>
        <LI className="f-w-600">Home</LI>
        {ProfilesMessage.map((detail, index) => (<LI key={index} className="f-12">
        <Link to={`${process.env.PUBLIC_URL}/email/email-app`}><ChevronRight />{detail.name}</Link></LI>))} */}
        <LI onClick={handleLogOut}>
          <LogIn />
          {Logout}
        </LI>
      </UL>
    </LI>
  );
};

export default UserProfile;

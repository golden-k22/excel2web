import { useLocation } from "react-router-dom";
const images = require.context("../assets/images", true);
export const dynamicImage = (image: string | undefined) => {
  return images(`./${image}`);
};

export const ActiveNavLinkUrl = (path: any, active: any = 0) => {
  const location = useLocation();
  return location.pathname === path ? (active ? active : true) : "";
};

export const toggleLoginForm = () => {
  document.querySelector(".cont")?.classList.toggle("s--signup");
};

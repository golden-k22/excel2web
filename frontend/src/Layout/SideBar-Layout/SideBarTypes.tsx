interface subMenuInterface2 {
  title: string;
  url?: string;
}
export  interface subMenuInterface {
  title: string;
  url?: string;
  menu?: subMenuInterface2[];
  icon?: JSX.Element;
}
export interface menuInterface {
  title: string;
  icon: JSX.Element;
  mainTitle?:string;
  badge?: boolean;
  url?: string;
  menu?: subMenuInterface[];
}
export interface sidebarTypes {
  menu: menuInterface[];
  className?: string;
  setIsOpen:Function;
  isOpen: [] | string[];
  level: number;
}

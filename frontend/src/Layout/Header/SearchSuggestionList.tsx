import { Link } from "react-router-dom";
import { UL, LI, P } from "../../AbstractElements";
import { SearchbarEmptyText } from "../../Constant";
import {menuInterface,subMenuInterface,} from "../SideBar-Layout/SideBarTypes";
interface propsType {
  setSuggestionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suggestion: menuInterface[] | subMenuInterface[] | [];
}
const SearchSuggestionList = ({ setSuggestionOpen, suggestion }: propsType) => {
  const handleLinkClick = () => {
    setSuggestionOpen(false);
  };
  return (
    <div className="suggestion-box ">
      {suggestion.length !== 0 && (
        <UL className="custom-scrollbar justify-content-start">
          {suggestion.map((item: any, i: number) => (
            <LI key={i}>
              <Link
                onClick={handleLinkClick}
                to={item.url}
                className="d-flex align-items-center gap-1"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </LI>
          ))}
        </UL>
      )}
      {!suggestion.length && <P>{SearchbarEmptyText}</P>}
    </div>
  );
};

export default SearchSuggestionList;

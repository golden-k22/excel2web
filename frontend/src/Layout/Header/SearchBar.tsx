import { useState } from "react";
import { Search, X } from "react-feather";
import { LI } from "../../AbstractElements";
import { Input } from "reactstrap";
import MENUITEMS from "../SideBar-Layout/Menu";
import SearchSuggestionList from "./SearchSuggestionList";
import { menuInterface, subMenuInterface } from "../SideBar-Layout/SideBarTypes";

const SearchBar = () => {
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestion, setSuggestion] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value;
    searchKey.toLowerCase();

    if (searchKey !== '') {
      let icon:JSX.Element;
      let suggestionArray:menuInterface[] | subMenuInterface[] | [] | any   = [];
      let updatedList:menuInterface | subMenuInterface ;
      const deepSearchFun = (menuItem:menuInterface | subMenuInterface, searchKeyValue:string, mainTitle:string) => {
        if (menuItem.title.toLowerCase().includes(searchKeyValue) && menuItem.url) {
          updatedList = { ...menuItem, mainTitle, icon };
          suggestionArray.push(updatedList);
        }
        if (!menuItem.menu) return;
        menuItem.menu.map((mainSubItem:subMenuInterface) => {
          if (menuItem.icon) {
            icon = menuItem.icon;
          }
          deepSearchFun(mainSubItem, searchKeyValue, mainTitle);
        });
      };
      MENUITEMS.map((mainItem) => {
        const mainTitle = mainItem.title;
        deepSearchFun(mainItem, searchKey, mainTitle);
      });
      setSuggestion(suggestionArray);
      setSuggestionOpen(true);
    }

    if (searchKey === '') {
      setSuggestionOpen(false);
      setSuggestion([]);
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <LI className="p-0 border-0">
      <form className={`form-inline search-form header-search ${open ? "open" : ""}`}>
        <Input onChange={handleSearch} className="form-control-plaintext" placeholder="Search....." />
        <X onClick={() => {setOpen(!open); setSuggestionOpen(!suggestionOpen  )}} />
      </form>
      <span className={`mobile-search ${open ? "open" : ""}`}>
        <Search
          onClick={() => setOpen(!open)}
        />
      </span>
      {suggestionOpen && <SearchSuggestionList setSuggestionOpen={setSuggestionOpen} suggestion={suggestion} />}
    </LI>
  );
};

export default SearchBar;

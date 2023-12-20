import { useState, useEffect, useCallback } from "react";
import { Input } from "reactstrap";
import ListOfMenu from "./ListOfMenu";
import EmpltyClass from "./EmptyClass";
import BackBtns from "./BackBtn";
import RemoveBookmark from "./RemoveBookmark";
import { Bookmark } from "react-feather";
import { LI, UL } from "../../../AbstractElements";
import MENUITEMS from "../../SideBar-Layout/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./ReducerTypes";

const Bookmarks = () => {
  const { bookMarkClass } = useSelector((state: RootState) => state.BookMarkReducer);
  const mainmenu: any = MENUITEMS;
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]); 
  const [bookmarkItems, setBookmarkItems] = useState<any>([]);
  const [searchIcon, setSearchIcon] = useState(false);
  const [bookmarkDropDown, setBookmarkDropDown] = useState(false);
  const checkSearchResultEmpty = (items: any) => {
      if (!items.length) {setSearchIcon(true);} 
        else {setSearchIcon(false);}};
  useEffect(() => {
    mainmenu.map((menuItems: any) => {
      if (menuItems.bookmark) {setBookmarkItems((bookmarkItems: any) => [...bookmarkItems, menuItems]);}
      if (!menuItems.menu) return false;
      menuItems.menu?.filter((mItems: any) => {
        if (mItems.bookmark) { mItems.icon = menuItems.icon; setBookmarkItems((bookmarkItems: any) => [...bookmarkItems, mItems]);}      
        if (!mItems.menu) return false;
        mItems.menu.filter((subItems: any) => {
          if (subItems.bookmark) { subItems.icon = menuItems.icon; setBookmarkItems((bookmarkItems: any) => [...bookmarkItems, subItems]);}      if (!subItems.menu) return false;
          return subItems
        })
        return mItems
      })
      return menuItems
    })
  }, [])
  const addFix = () => dispatch({ type: "setIsClose", payload: true });
  const removeFix = () => setSearchValue(searchValue);
  const handleSearchKeyword = (keyword: any) => {
    keyword ? addFix() : removeFix();
    const items: any = [];
    setSearchValue(keyword);
  mainmenu.map((menuItems: any) => {
      if (menuItems.title.toLowerCase().includes(keyword) && menuItems.type === "link") {
        items.push(menuItems);
      }       if (!menuItems.menu) return false;
      menuItems.menu?.filter((mItems: any) => {
        if (mItems.title.toLowerCase().includes(keyword) && mItems.type === "link") {
          mItems.icon = menuItems.icon
          items.push(mItems);
        }      if (!mItems.menu) return false;
        mItems.menu.filter((subItems: any) => {
          if (subItems.title.toLowerCase().includes(keyword) && subItems.type === "link") {
            subItems.icon = menuItems.icon
            items.push(subItems);
          }       if (!subItems.menu) return false;
          return subItems
        })
        return mItems
      })
      checkSearchResultEmpty(items); setSearchResult(items);
      return menuItems
    })
  };
  const removeFixCallback = useCallback((searchVal: any) => {setSearchValue(searchVal);}, []);
  const setCallbackBookmark = useCallback((valueAdd: any) => {setBookmarkItems(valueAdd);}, []);
  return (
    <LI className="onhover-dropdown">
      <div className="notification-box" onClick={() => setBookmarkDropDown(!bookmarkDropDown)}><Bookmark /></div>
      <div className={`onhover-show-div bookmark-flip ${bookmarkDropDown ? "active" : ""}`}>
        <div className="flip-card">
          <div className={`flip-card-inner ${bookMarkClass ? "flipped" : ""}`}>
            <RemoveBookmark bookmarkItems={bookmarkItems} />
            <div className="back dropdown-title">
              <UL>
                <LI className="p-3">
                  <div className="bookmark-dropdown flip-back-content">
                    <Input type="text" placeholder="search..." defaultValue={searchValue} onChange={(e) => handleSearchKeyword(e.target.value)}/>
                    <ListOfMenu removeFix={removeFixCallback} bookmarkItems={bookmarkItems} setCallbackBookmark={setCallbackBookmark} searchValue={searchValue} setBookmarkItems={setBookmarkItems} searchResult={searchResult} setSearchResult={setSearchResult}/>
                    <EmpltyClass searchIcon={searchIcon} />
                  </div>
                </LI>
                <BackBtns />
              </UL>
            </div>
          </div>
        </div>
      </div>
    </LI>
  );
};
export default Bookmarks;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Href } from "../../../Constant";
import { RootState } from "./ReducerTypes";

const ListOfMenu = (props: any) => {
  const { IsOpen } = useSelector((state: RootState) => state.BookMarkReducer);
  const { searchToggle, searchBar, searchValue, removeFix, setBookmarkItems, bookmarkItems, searchResult } = props;
  const addToBookmark = (event: any, items: any) => {
    const index = bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      event.currentTarget.classList.add("starred");
      setBookmarkItems([...bookmarkItems, items]);
    } else {
      event.currentTarget.classList.remove("starred");
      bookmarkItems.splice(index, 1);
      setBookmarkItems(bookmarkItems);
      items.bookmark = false;
    }
  };
  return (
      <div className={`${searchBar ? `Typeahead-menu theme-scrollbar ${searchToggle ? "is-open" : ""}` : `filled-bookmark Typeahead-menu  ${IsOpen ? " is-open" : ""} custom-scrollbar`} `} id="search-outer">
        {searchValue &&
          searchResult.map((data: any, index: number) => {
            return (
              <div className="ProfileCard u-cf" key={index}>
                <div className="ProfileCard-avatar">
                  {data.icon}
                </div>
                <div className="ProfileCard-details">
                  <div className="ProfileCard-realName">
                    <Link
                      to={data.url}
                      className="realname"
                      onClick={removeFix}
                    >
                      {data.title}
                    </Link>
                    {searchBar ? (
                      ""
                    ) : (
                      <span className="pull-right">
                        <a href={Href}>
                          <i
                            className="fa fa-star-o mt-1 icon-star"
                            onClick={(e) => addToBookmark(e, data)}
                          ></i>
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
  );
};

export default ListOfMenu;
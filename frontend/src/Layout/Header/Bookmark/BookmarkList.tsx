import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Btn, LI } from "../../../AbstractElements";
import { AddNewBookmark } from "../../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./ReducerTypes";

const BookmarkList = (props: any) => {
  const { bookmarkItems = "" } = props;
  const { bookMarkClass } = useSelector((state: RootState) => state.BookMarkReducer);
  const dispatch = useDispatch()
  const addnewbookmark = () => {dispatch({ type: "setBookMarkClass", payload: !bookMarkClass });};
  return (
    <>
      <Row>
        {bookmarkItems.map((items: any, index: number) =>
        (
          <Col xs="4" className="text-center" key={index}>
            <div className="bookmark-content">
              <div className="bookmark-icon">
                <Link to={items.url}>{items.icon}</Link>
              </div>
            </div>
          </Col>
        )
        )}
      </Row>
      <LI className="text-center pb-0">
        <Btn
          className="flip-btn d-block w-100"
          color="primary"
          onClick={addnewbookmark}
        >
          {AddNewBookmark}
        </Btn>
      </LI>
    </>
  );
};
export default BookmarkList;
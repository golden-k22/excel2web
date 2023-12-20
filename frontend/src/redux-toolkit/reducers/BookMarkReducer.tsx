import { createReducer } from "@reduxjs/toolkit";

var initialState: any = {
  bookmark: [],
  activeTabss: "1",
  gridView: true,
  mybookmarkData: [],
  editRow: {},
  editModal: false,
  editimgurl: "",
  bookMarkClass:false,
  IsOpen:false
};

export const BookMarkReducer = createReducer(initialState, {
  setIsClose: (state, action) => {
    state.IsOpen = action.payload;
  },
  setBookMarkClass: (state, action) => {
    state.bookMarkClass = action.payload;
  },
  updateFillStar: (state, action) => {
    state.bookmark = state.bookmark.map((data:any) => (data.id === action.payload.id ?{...data,fillstar:true}:{...data})) 
    state.mybookmarkData.push({...action.payload,fillstar:true})
  },
  fillStarFalse: (state, action) => {
    state.bookmark = state.bookmark.map((data:any) => (data.id === action.payload ?{...data,fillstar:false}:{...data})) 
  },
  updateFavFilStar: (state, action) => {
    state.mybookmarkData = state.mybookmarkData.map((data:any) => (data.id === action.payload ?{...data,fillstar:false}:{...data})) 
  },
  addData: (state, action) => {
    state.bookmark = action.payload;
  },
  addNewBookmark: (state, action) => {
    const bookmarkTemp = {
      id: state.bookmark.length + 1,
      fillStar: false,
      image: action.payload.img_url,
      title: action.payload.data.title,
      website_url: action.payload.data.website_url,
      desc: action.payload.data.desc,
      collection: action.payload.data.collection,
    };
    state.bookmark = [bookmarkTemp,...state.bookmark];
  },
  updateActiveTabss: (state, action) => {
    state.activeTabss = action.payload;
  },
  setGridView: (state, action) => {
    state.gridView = action.payload;
  },
  removeBookmMark: (state, action) => {
    state.bookmark = state.bookmark.filter(
      (data: any) => data.id !== action.payload
    );
  },
  removeMyBookMark: (state, action) => {
    state.mybookmarkData = state.mybookmarkData.filter(
      (data: any) => data.id !== action.payload
    );
  },
  setEditImgUrl: (state, action) => {
    state.editimgurl = action.payload;
  },
  setEditRow: (state, action) => {
    state.editRow = action.payload;
  },
  setEditModal: (state, action) => {
    state.editModal = action.payload;
  },
  updateBookMark: (state, action) => {
    const bookmarkTemp = {
      id: action.payload.id,
      fillStar: action.payload.data.fillStar,
      image: action.payload.image_url,
      title: action.payload.data.title,
      website_url: action.payload.data.url,
      desc: action.payload.data.desc,
      collection: action.payload.data.collection,
    };
    state.bookmark = state.bookmark.map((item: any) =>
      item.id === action.payload.id ? bookmarkTemp : item
    );
  },
});

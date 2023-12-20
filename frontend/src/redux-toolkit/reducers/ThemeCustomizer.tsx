import { createReducer } from "@reduxjs/toolkit";
import ConfigDB from "../../config/ThemeConfig";
let initialState = {
  toggleThemeCustomizer: false,
  layout: "",
  sidebar_types: "compact-wrapper",
  defaultClass: false,
  mix_background_layout: "light-only",
  toggleIcon:false
};

export const ThemeCustomizer = createReducer(initialState, {
  setToggleThemeCustomizer: (state, action) => {
    state.toggleThemeCustomizer = action.payload;
  },
  setToggleIcon: (state, action) => {
    state.toggleIcon = action.payload;
  },
  setMixBackgroundLayout: (state, action) => {
    state.mix_background_layout = action.payload;
  },
  addLayout: (state, action) => {
    ConfigDB.data.settings.layout_type = action.payload;
    state.layout = action.payload;
  },
  addSidebarTypes: (state, action) => {
    ConfigDB.data.settings.sidebar.type = action.payload;
    state.sidebar_types = action.payload;
  },
  addSideBarBackGround: (state, action) => {
    ConfigDB.data.color.mix_background_layout = action.payload;
    state.mix_background_layout = action.payload;
  },

});

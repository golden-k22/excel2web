import { configureStore } from "@reduxjs/toolkit";
import { BookMarkReducer } from './reducers/BookMarkReducer';
import { ThemeCustomizer } from './reducers/ThemeCustomizer';

export const store = configureStore({
    reducer: {
        BookMarkReducer,
        ThemeCustomizer,
    },
})
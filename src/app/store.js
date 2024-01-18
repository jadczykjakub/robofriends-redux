import { configureStore } from "@reduxjs/toolkit";
import robotsSlice from "../features/robotSlice";

export default configureStore({
  reducer: {
    robots: robotsSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import loginReducer from "../pages/login/loginSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    login: loginReducer,
  },
});

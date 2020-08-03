import { configureStore } from "@reduxjs/toolkit";
import { reducer as oidc } from "@axa-fr/react-oidc-redux";

// import postsReducer from "../features/posts/postsSlice";
// import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import loginReducer from "../pages/login/loginSlice";

export default configureStore({
  reducer: {
    notifications: notificationsReducer,
    login: loginReducer,
    odic: oidc,
  },
});

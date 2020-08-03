import {
  createSlice,
  createAsyncThunk,
  unwrapResult,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { client } from "../../api/client";

const loginAdapter = createEntityAdapter();
const initialState = loginAdapter.getInitialState({
  status: "",
  exists: false,
  error: null,
});

export const GetPersonByEmail = createAsyncThunk(
  "WebUser/GetPersonByEmail",
  async (email) => {
    const response = await client.get(
      `https://testapply.acrrm.org.au/api/v1/WebUser/GetPersonByEmail/${email}`
    );
    return response.statusCode;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [GetPersonByEmail.pending]: (state, action) => {
      state.status = "loading";
      state.exists = true;
    },
    [GetPersonByEmail.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [GetPersonByEmail.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;

// export const fetchNotifications = createAsyncThunk(
//   "WebUser/GetPersonByEmail",
//   async (email, thunkApi) => {
//     const response = await gfetch<Success, Error>(
//       `api/v1/WebUser/GetPersonByEmail/${email}`
//     ).json();

//     return await response;

//     // const response = await fetch(
//     //   `https://testapply.acrrm.org.au/api/v1/WebUser/GetPersonByEmail/${email}`,
//     //   {
//     //     method: "GET",
//     //   }
//     // );
//     // if (response.status === 400) {
//     //   // Return the known error for future handling
//     //   return thunkApi.rejectWithValue((await response.json()) as MyKnownError);
//     // }
//     // return (await response.json()) as MyData;
//   }
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState: {
//     entities: string,
//     loading: "idle",
//     currentRequestId: "",
//     error: "",
//   },
//   reducers: {},
//   extraReducers: (builder) =>
//     builder
//       .addCase(fetchUserByEmail.pending, (state, action) => {
//         if (state.loading === "idle") {
//           state.loading = "pending";
//           state.currentRequestId = action.meta.requestId;
//         }
//       })
//       .addCase(fetchUserByEmail.fulfilled, (state, action) => {
//         const { requestId } = action.meta;
//         if (
//           state.loading === "pending" &&
//           state.currentRequestId === requestId
//         ) {
//           state.loading = "idle";
//           state.entities = action.payload;
//           state.currentRequestId = "";
//         }
//       })
//       .addCase(fetchUserByEmail.rejected, (state, action) => {
//         const { requestId } = action.meta;
//         if (
//           state.loading === "pending" &&
//           state.currentRequestId === requestId
//         ) {
//           state.loading = "idle";
//           state.error = action.error.toString();
//           state.currentRequestId = "";
//         }
//       }),
// });

// interface RootState {
//   users: any;
// }

// const UsersComponent = () => {
//   const { users, loading, error } = useSelector(
//     (state: RootState) => state.users
//   );
//   const dispatch = useDispatch();

//   const fetchOneUser = async (userId: string) => {
//     try {
//       const resultAction = await dispatch(fetchUserByEmail(userId));
//       // const user = unwrapResult(resultAction);
//       // showToast("success", `Fetched ${user.name}`);
//     } catch (err) {
//       // showToast("error", `Fetch failed: ${err.message}`);
//     }
//   };

//   // render UI here
// };

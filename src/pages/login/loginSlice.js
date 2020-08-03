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
  exists: null,
  error: null,
});

export const GetPersonByEmail = createAsyncThunk(
  "WebUser/GetPersonByEmail",
  async (email, thunkAPI) => {
    console.log(thunkAPI);
    const response = await client.get(
      `/api/v1/WebUser/GetPersonByEmail/${email}`
    );
    return JSON.stringify(response);
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [GetPersonByEmail.pending]: (state, action) => {
      state.status = "loading";
    },
    [GetPersonByEmail.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.exists = true;
    },
    [GetPersonByEmail.rejected]: (state, action) => {
      state.status = "failed";
      debugger;
      if (action.error.message === "404") {
        state.exists = false;
      }
      state.error = action.error.message;
    },
  },
});

export default loginSlice.reducer;

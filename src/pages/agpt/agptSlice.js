import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const agptAdapter = createEntityAdapter();
const initialState = agptAdapter.getInitialState({
  status: "",
  exists: false,
  error: null,
});

export const GetPersonByEmail = createAsyncThunk(
  "AGPT/sendData",
  async (email, thunkAPI) => {
    console.log(thunkAPI);
    const response = await client.get(
      `/api/v1/WebUser/GetPersonByEmail/${email}`
    );
    return JSON.stringify(response);
  }
);

const agptSlice = createSlice({
  name: "agpt",
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
      if (action.error.message === "404") {
        state.exists = false;
      }
      state.error = action.error.message;
    },
  },
});

export default agptSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const agptAdapter = createEntityAdapter();
const initialState = agptAdapter.getInitialState({});

export const Person = createAsyncThunk(
  "agpt/Person",
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
    [Person.pending]: (state, action) => {
      state.status = "loading";
    },
    [Person.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.exists = true;
    },
    [Person.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default agptSlice.reducer;

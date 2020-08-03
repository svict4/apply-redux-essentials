import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const loginAdapter = createEntityAdapter();
const initialState = loginAdapter.getInitialState({
  status: "",
  exists: false,
  error: null,
  accountCreated: null,
  person: {
    firstName: "",
    lastName: "",
    middleName: "",
    title: "",
    preferredName: "",
  },
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

export const CreateAccount = createAsyncThunk(
  "WebUser/CreateAccount",
  async (data, thunkAPI) => {
    console.log(thunkAPI);
    let post = { email: data.email, userName: data.email, ...data.person };
    const response = await client.post(`/api/v1/WebUser`, post);
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
      if (action.error.message === "404") {
        state.exists = false;
      }
      state.error = action.error.message;
    },
    [CreateAccount.pending]: (state, action) => {
      state.status = "loading";
    },
    [CreateAccount.fulfilled]: (state, action) => {
      debugger;
      state.status = "succeeded";
      state.person = { ...action.meta.arg.person };
      state.person.email = action.meta.arg.email;
      state.accountCreated = true;
    },
    [CreateAccount.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default loginSlice.reducer;

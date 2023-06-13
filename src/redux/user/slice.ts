import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sign } from "crypto";

interface UserState {
  loading: boolean,
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
}

export const signIn = createAsyncThunk(
  "user/signIn",
  // 返回一个promise，使用toolkit中的自动来实现
  // 通过将定义从reducers放到extraReducers中去
  async (paramaters: {
    email: string,
    password: string,
  }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: paramaters.email,
      password: paramaters.password
    }
    );
    return data.token;
  }

  // 手动控制api
  // "productDetail/getProductDetail",
  // async (touristRouteId: string, thunkAPI) => {
  //   thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
  //   try {
  //     const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
  //     thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message))
  //     }
  //   }
  // }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  }
})
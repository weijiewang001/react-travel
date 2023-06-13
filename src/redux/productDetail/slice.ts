import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean,
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
}

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  // 返回一个promise，使用toolkit中的自动来实现
  // 通过将定义从reducers放到extraReducers中去
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
    return data;
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

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {

  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  }
})
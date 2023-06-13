import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
  loading: boolean,
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
}

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  // 返回一个promise，使用toolkit中的自动来实现
  // 通过将定义从reducers放到extraReducers中去
  async (paramaters: {
    keywords: string,
    nextPage: number | string,
    pageSize: number | string,
  }, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
    if (paramaters.keywords) {
      url += `&keyword=${paramaters.keywords}`;
    }
    const response = await axios.get(url);
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"])
    };
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

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {

  },
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  }
})
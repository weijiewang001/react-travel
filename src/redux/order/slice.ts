import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface OrderState {
  loading: boolean,
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
}

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  // 返回一个promise，使用toolkit中的自动来实现
  // 通过将定义从reducers放到extraReducers中去
  async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,
      null, {
      headers: {
        Authorization: `bearer ${parameters.jwt}`
      },
    }
    );
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

  },
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },


    [checkout.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  }
})
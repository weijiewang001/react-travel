import axios from "axios";
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store";

// 定义的type
export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; //正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; //推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; //推荐信息api调用失败

// 定义的接口配置
interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  payload: any,
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
  payload: any,
}

// 接口配置汇总
export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction;

// 定义的creator
export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  }
}

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  }
}


// thunk 可以返回要给函数， 而不一定是js对象
// 在一个thunk action中可以完成一系列连续的action操作
// 并且可以处理异步的逻辑
// 业务逻辑可以从ui层面挪到这里，代码逻辑更清晰
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> => async (dispatch, getState) => {
  dispatch(fetchRecommendProductStartActionCreator())
  try {
    const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections");
    dispatch(fetchRecommendProductSuccessActionCreator(data))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchRecommendProductFailActionCreator(error.message))
    }
  }
};
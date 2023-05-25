// 由于react 6不支持 class类 进而原生不支持HOC高阶组件
// 如果老的项目在升级成react 6之后，可以通过手写一个HOC组件来实现调用钩子函数。
// 如下所示


import { useNavigate, NavigateFunction } from "react-router-dom";

export interface RouteComponenetProps {
  navigate: NavigateFunction;
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  };
  return Wrapper;
};
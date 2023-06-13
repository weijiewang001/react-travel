import React from "react";
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartner } from "../../components";
import { Row, Col, Typography, Spin } from 'antd';
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import styles from "./HomePage.module.css"
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions"
import { MainLayout } from "../../layouts/mainLayout"

// interface State {
//   loading: boolean,
//   error: string | null,
//   productList: any[]
// }

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

// import { withRouter, RouteComponenetProps } from '../../helpers/withRouter'

class HomePageComponent extends React.Component<PropsType> {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     loading: true,
  //     error: null,
  //     productList: [],
  //   }
  // }


  // componentDidMount(): void {
  //   axios.get("http://123.56.149.216:8080/api/productCollections", {
  //     headers: {
  //       "x-icode": "362C30C652ACA6B3",
  //     }
  //     // 这里使用大括号直接展开了promise的数据promise.data
  //     // 然后设置State数据
  //   }).then(({ data }) => {
  //     this.setState({
  //       productList: data,
  //     });
  //   });
  // }

  // 对promise回复的await写法

  componentDidMount() {
    this.props.giveMeData();
  }


  render() {
    // console.log(this.props.t)

    const { t, productList, loading, error } = this.props;
    if (loading) {
      return <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    }
    if (error) {
      return <div>网站出错： {error}</div>
    }
    // console.log(this.props.navigate)
    return <>
      <MainLayout>
        {/* 页面内容 content */}
        <div className={styles['page-content']}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={<Typography.Title level={3} type="warning">{t("home_page.hot_recommended")}</Typography.Title>}
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type="danger">{t("home_page.new_arrival")}</Typography.Title>}
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type="success">{t("home_page.domestic_travel")}</Typography.Title>}
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartner />

        </div>

      </MainLayout>
    </>;
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))
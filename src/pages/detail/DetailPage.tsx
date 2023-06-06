import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Spin, Row, Col, DatePicker, Space, Divider, Typography } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro } from "../../components";

const { RangePicker } = DatePicker;

type MatchParams = {
  touristRouteId: string,
  other: string
}

// interface MatchParams2 {
//   touristRouteId: string,
//   other: string
// }


export const DetailPage: React.FC = () => {
  var params = useParams<MatchParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${params.touristRouteId}`);
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "error");
        setLoading(false);
      }
    }
    fetchData();
  }, [])

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
  return <>
    <Header />
    <div className={styles["page-content"]}>
      {/* 产品简介 与 日期选择 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.shortDescription}
              price={product.price}
              coupons={product.coupons}
              points={product.points}
              discount={product.discount}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <div className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
      </div>
      {/* 产品特色 */}
      <div id='feature' className={styles["product-detail-container"]}>

      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}></div>
      {/* 预定须知 */}
      <div id="notes" className={styles["product-detail-container"]}></div>
      {/* 商品评价 */}
      <div id='comments' className={styles["product-detail-container"]}></div>
    </div>
    {/* <h1>旅游路线详情页, 路线id: {params.touristRouteId} {params.other} </h1>; */}
    <Footer />
  </>
};

import React from "react";
import styles from "./BusinessPartner.module.css"
import facebook from "../../assets/images/facebook-807588_640.png"
import insgram from "../../assets/images/follow-826033_640.png"
import youtube from "../../assets/images/icon-720944_640.png"
import microsoft from "../../assets/images/microsoft-80658_640.png"
import { Typography, Divider, Row, Col, Image } from "antd";

const companies = [
  { src: microsoft, title: "microsoft" },
  { src: youtube, title: "youtube" },
  { src: insgram, title: "insgram" },
  { src: facebook, title: "facebook" },


]

export const BusinessPartner: React.FC = () => {
  return (
    <div>
      <Divider orientation="left">
        <Typography.Title level={3}>合作企业</Typography.Title>
      </Divider>
      <Row>
        {companies.map((c, index) => (
          <Col span={6} key={"bussiness-partner-" + index}>
            <Image src={c.src} style={{
              width: "80%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}></Image>
          </Col>
        ))
        }
      </Row>
    </div>
  )
}
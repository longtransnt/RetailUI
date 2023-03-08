import React, { useState, useEffect } from "react";
import { UPDATE_INTERVAL } from "../constant";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import priceSerivces from "services/priceSerivces";
import { render } from "react-dom";

function PriceTable() {
  const [goldprice, setGoldPrice] = useState([]);
  const getPrice = async () => {
    let prices = await priceSerivces.getLatestPrice();
    prices.forEach((element) => {
      element.time = getTime(element.time);
    });
    setGoldPrice(prices);
  };

  const getTime = (data) => {
    let datetime = data.split("T");
    let date = datetime[0].split("-");
    let time = datetime[1].split(":");
    let string =
      Number(time[0]) +
      7 +
      ":" +
      time[1] +
      " - Ngày " +
      date[2] +
      "/" +
      date[1] +
      "/" +
      date[0];
    return string;
  };

  useEffect(() => {
    // getTime();
    getPrice();

    setInterval(() => {
      getPrice();
    }, UPDATE_INTERVAL);
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2"></Col>
          <Col md="1">
            <img
              style={{ height: 90 }}
              src={require("./../assets/img/logo.jpg")}
            />
          </Col>
          <Col md="7">
            <h3 style={{ fontWeight: "bold", color: "orange" }}>
              DNTN Kinh Doanh Vàng và Cầm Đồ Trọng Nghĩa
            </h3>
          </Col>
        </Row>
        <Row className="pricetable">
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              {/* <Card.Header>
                <Card.Title as="h4">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <br />
                    DNTN Kinh Doanh Vàng và Cầm Đồ Trọng Nghĩa
                  </div>
                </Card.Title>
              </Card.Header> */}
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="border-0">Loại Vàng</th>
                      <th className="border-0">Giá Mua</th>
                      <th className="border-0">Giá Bán</th>
                      {/* <th className="border-0">Cập Nhật</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {goldprice.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td></td>
                          <td>
                            {item.name}
                            <p className="card-category">
                              Cập nhật lúc: {item.time}
                            </p>
                          </td>

                          <td>{Number(item.price).toLocaleString("vi-VN")}</td>
                          <td>
                            {Number(item.sellprice).toLocaleString("vi-VN")}
                          </td>
                          {/* <td>{item.time}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PriceTable;

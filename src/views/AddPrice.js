import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import priceSerivces from "services/priceSerivces";

function AddPrice() {
  const [goldprice, setGoldPrice] = useState([]);

  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "price",
  });

  const getPrice = async () => {
    let prices = await priceSerivces.getLatestPrice();

    setGoldPrice(prices);
  };

  const validateUpdate = (data) => {
    let temp = [];
    for (let i = 0; i < goldprice.length; i++) {
      if (Number(data.price[i].price) - Number(goldprice[i].price) !== 0) {
        temp.push(i);
      }
    }

    temp.forEach(function (element, index) {
      console.log(element);
      console.log(data.price[element]);
      priceSerivces.addPrice(data.price[element], element + 0);
    });
  };

  useEffect(() => {
    getPrice();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nhập Giá Vàng Mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit((data) => validateUpdate(data))}>
                  <Form.Group>
                    <Row></Row>
                    <Row>
                      <ul>
                        {goldprice.map((item, key) => {
                          return (
                            <Row key={key}>
                              <Col className="pr-1" md="3">
                                {item.name}
                              </Col>
                              <Col className="pr-1" md="3">
                                <Form.Control
                                  type="text"
                                  defaultValue={item.price}
                                  {...register(`price.${key}.price`)}
                                />
                              </Col>
                              <Col className="pr-1" md="3">
                                <Form.Control
                                  type="text"
                                  defaultValue={item.sellprice}
                                  {...register(`price.${key}.sellprice`)}
                                />
                              </Col>
                            </Row>
                          );
                        })}
                      </ul>
                    </Row>
                  </Form.Group>
                  <div className="buttonrow">
                    <Button
                      className="btn-fill pull-right"
                      variant="primary"
                      type="submit"
                    >
                      Cập Nhật Giá Vàng
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddPrice;

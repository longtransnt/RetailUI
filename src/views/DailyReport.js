import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Report() {
  const [bankAmount1, setBankAmount1] = useState(5000000);
  const [bankAmount2, setBankAmount2] = useState(5000000);
  const [date, setDate] = useState("");
  const [dateArray, setDateArray] = useState([]);

  const handleDateChange = () => {
    // Fetch bank sum
    // Fetch
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Báo Cáo Chuyển Khoảng, Thu Chi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Ngày</label>
                        <Form.Control
                          onChange={handleDateChange}
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tiền Phượng 22/3
                        </label>
                        <Form.Control
                          defaultValue={500000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Tiền Phượng 23/3</label>
                        <Form.Control
                          defaultValue={500000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tổng Phần Mềm</label>
                        <Form.Control
                          defaultValue={5000000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tổng Thu Được
                        </label>
                        <Form.Control
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tổng Chi</label>
                        <Form.Control
                          defaultValue={5000000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Ngân Hàng SCB</label>
                        <Form.Control
                          defaultValue={bankAmount1}
                          placeholder=""
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Ngân Hàng VCB</label>
                        <Form.Control
                          defaultValue={bankAmount2}
                          placeholder=""
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Tổng Chuyển Khoảng</label>
                        <Form.Control
                          defaultValue={bankAmount1 + bankAmount2}
                          placeholder=""
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nợ Tỉnh</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Nhật</label>
                      <Form.Control
                        defaultValue={50000000}
                        placeholder=""
                        type="number"
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Chi</label>
                      <Form.Control
                        defaultValue={50000000}
                        placeholder=""
                        type="number"
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Phượng</label>
                      <Form.Control
                        defaultValue={50000000}
                        placeholder=""
                        type="number"
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Hà</label>
                      <Form.Control
                        defaultValue={50000000}
                        placeholder=""
                        type="number"
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Report;

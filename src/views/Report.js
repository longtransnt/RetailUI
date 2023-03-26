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
import debtServices from "services/debtServices";
import transactionServices from "services/transactionServices";

function Report2() {
  const [bankAmount1, setBankAmount1] = useState(0);
  const [bankAmount2, setBankAmount2] = useState(0);
  const [date, setDate] = useState("");
  const [dateArray, setDateArray] = useState(["YYYY", "MM", "DD"]);
  const [nextDate, setNextDate] = useState("");
  const [debt, setDebt] = useState([]);

  const handleDateChange = async (event) => {
    // Fetch bank sum
    setDebt([]);
    const target = event.target.value;
    const array = target.split("-");
    setDate(target);
    setDateArray(array);
    setNextDate(Number(array[2]) + 1);

    const debts = await debtServices.getAllEmployeeDebtOnDate(target);
    setDebt(debts);

    const bank1 = await transactionServices.getTotalTransactionValue(
      "SCB",
      target
    );
    setBankAmount1(bank1.value);

    const bank2 = await transactionServices.getTotalTransactionValue(
      "VCB",
      target
    );
    setBankAmount2(bank2.value);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Báo Cáo Chuyển Khoảng, Thu Chi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Ngày</label>
                        <Form.Control
                          onChange={handleDateChange}
                          type="date"
                          value={date}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Chi</label>
                        <Form.Control
                          defaultValue={5000000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tiền Phượng {dateArray[2] + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          defaultValue={500000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Tiền Phượng {nextDate + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          defaultValue={500000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {debt.map((item, key) => {
                      return (
                        <Col className="pl-1" md="2" key={key}>
                          <Form.Group>
                            <label>{item.name}</label>
                            <Form.Control
                              defaultValue={item.totalDebt}
                              placeholder=""
                              type="number"
                              disabled
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      );
                    })}
                  </Row>

                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Phần Mềm</label>
                        <Form.Control
                          defaultValue={5000000}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
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
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Số Món Bán</label>
                        <Form.Control
                          defaultValue={256}
                          placeholder=""
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Sacombank</label>
                        <Form.Control
                          value={bankAmount1}
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                      <Form.Group>
                        <label>Vietcombank</label>
                        <Form.Control
                          value={bankAmount2}
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
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
          {/* <Col md="4">
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
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Report2;

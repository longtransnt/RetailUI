import React, { useState } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import balanceServices from "services/balanceServices";
import debtServices from "services/debtServices";
import transactionServices from "services/transactionServices";

function ViewReport() {
  const [bankAmount1, setBankAmount1] = useState(0);
  const [bankAmount2, setBankAmount2] = useState(0);
  const [income1, setIncome1] = useState(0);
  const [income2, setIncome2] = useState(0);
  const [softwareIncome, setSoftwareIncome] = useState(0);
  const [cashIncome, setCashIncome] = useState(0);
  const [saleAmount, setSaleAmount] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [remainBankAmount, setRemainBankAmount] = useState(0);
  const [date, setDate] = useState("");
  const [dateArray, setDateArray] = useState(["YYYY", "MM", "DD"]);
  const [nextDate, setNextDate] = useState("");
  const [debt, setDebt] = useState([]);
  const [totalSpare, setTotalSpare] = useState(0);

  const handleDateChange = async (event) => {
    setDebt([]);
    const target = event.target.value;
    const array = target.split("-");
    setDate(target);
    setDateArray(array);
    setNextDate(Number(array[2]) + 1);

    const debts = await debtServices.getAllEmployeeDebtOnDate(target);
    setDebt(debts);

    const balance = await balanceServices.getBalanceByDate(target);
    setSoftwareIncome(balance.software_balance);
    setCashIncome(balance.cash_balance);
    setTotalSpend(balance.total_spend);
    setBankAmount1(balance.bank_balance1);
    setBankAmount2(balance.bank_balance2);
    setIncome1(balance.shop_income1);
    setIncome2(balance.shop_income2);
    setSaleAmount(balance.sale_amount);
    setRemainBankAmount(balance.balance);
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
                  </Row>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0"></th>
                        {debt.map((item, key) => (
                          <th key={item.id} className="border-0">
                            {item.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Nợ Còn Tồn</td>
                        {debt.map((item, key) => (
                          <td key={item.id}>{item.totalBeforeDate}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Ngày {dateArray[2] + "/" + dateArray[1]}</td>
                        {debt.map((item, key) => (
                          <td key={item.id}>{item.debtOfDate}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Nợ Hiện Tại</td>
                        {debt.map((item, key) => (
                          <td key={item.id}>
                            {Number(item.debtOfDate) +
                              Number(item.totalBeforeDate)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Phần Mềm</label>
                        <Form.Control
                          value={softwareIncome}
                          onChange={(e) => setSoftwareIncome(e.target.value)}
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>
                          Tiền Phượng {nextDate + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          value={income2}
                          onChange={(e) => setIncome2(e.target.value)}
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Chi</label>
                        <Form.Control
                          onChange={(e) => setTotalSpend(e.target.value)}
                          type="number"
                          value={totalSpend}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tổng Thu Được
                        </label>
                        <Form.Control
                          value={cashIncome}
                          onChange={(e) => setCashIncome(e.target.value)}
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tiền Phượng {dateArray[2] + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          value={income1}
                          onChange={(e) => setIncome1(e.target.value)}
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pl-1" md="1">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Số Món Bán</label>
                        <Form.Control
                          value={saleAmount}
                          onChange={(e) => setSaleAmount(e.target.value)}
                          type="number"
                          disabled
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
                          value={Number(bankAmount1) + Number(bankAmount2)}
                          placeholder=""
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Tiền CK Còn Trong Ngày</label>
                        <Form.Control
                          value={remainBankAmount}
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

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

export default ViewReport;
